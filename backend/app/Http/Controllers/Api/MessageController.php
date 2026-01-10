<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Lister les conversations
     */
    public function conversations()
    {
        $userId = auth()->id();

        $userIds = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->get()
            ->map(function ($message) use ($userId) {
                return $message->sender_id === $userId ? $message->receiver_id : $message->sender_id;
            })
            ->unique()
            ->values();

        $conversations = User::whereIn('id', $userIds)
            ->get()
            ->map(function ($user) use ($userId) {
                $lastMessage = Message::where(function ($q) use ($userId, $user) {
                    $q->where('sender_id', $userId)->where('receiver_id', $user->id);
                })
                ->orWhere(function ($q) use ($userId, $user) {
                    $q->where('sender_id', $user->id)->where('receiver_id', $userId);
                })
                ->latest()
                ->first();

                $unreadCount = Message::where('sender_id', $user->id)
                    ->where('receiver_id', $userId)
                    ->where('is_read', false)
                    ->count();

                return [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                    ],
                    'last_message' => $lastMessage ? [
                        'message' => $lastMessage->message,
                        'created_at' => $lastMessage->created_at,
                        'is_read' => $lastMessage->is_read,
                    ] : null,
                    'unread_count' => $unreadCount,
                ];
            });

        return response()->json([
            'success' => true,
            'conversations' => $conversations
        ], 200);
    }

    /**
     * Lister les messages avec un utilisateur
     */
    public function messages($userId)
    {
        $authId = auth()->id();

        $messages = Message::where(function ($q) use ($authId, $userId) {
            $q->where('sender_id', $authId)->where('receiver_id', $userId);
        })
        ->orWhere(function ($q) use ($authId, $userId) {
            $q->where('sender_id', $userId)->where('receiver_id', $authId);
        })
        ->with(['sender:id,name,email', 'receiver:id,name,email', 'property:id,title'])
        ->orderBy('created_at', 'asc')
        ->get();

        // Marquer les messages reçus comme lus
        Message::where('sender_id', $userId)
            ->where('receiver_id', $authId)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return response()->json([
            'success' => true,
            'messages' => $messages
        ], 200);
    }

    /**
     * Envoyer un message
     */
    public function send(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'receiver_id' => 'required|exists:users,id',
            'property_id' => 'nullable|exists:properties,id',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'property_id' => $request->property_id,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Message envoyé avec succès',
            'data' => $message->load(['sender', 'receiver', 'property'])
        ], 201);
    }

    /**
     * Compter les messages non lus
     */
    public function unreadCount()
    {
        $count = Message::where('receiver_id', auth()->id())
            ->where('is_read', false)
            ->count();

        return response()->json([
            'success' => true,
            'unread_count' => $count
        ], 200);
    }

    /**
     * Marquer un message comme lu
     */
    public function markAsRead($id)
    {
        $message = Message::where('receiver_id', auth()->id())
            ->where('id', $id)
            ->first();

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message non trouvé'
            ], 404);
        }

        $message->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'Message marqué comme lu'
        ], 200);
    }

    /**
     * Supprimer un message
     */
    public function destroy($id)
    {
        $message = Message::where('sender_id', auth()->id())
            ->orWhere('receiver_id', auth()->id())
            ->where('id', $id)
            ->first();

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Message non trouvé'
            ], 404);
        }

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message supprimé'
        ], 200);
    }
}