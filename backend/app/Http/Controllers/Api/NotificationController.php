<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Lister toutes les notifications de l'utilisateur
     */
    public function index(Request $request)
    {
        $query = Notification::where('user_id', auth()->id());

        // Filtrer par type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filtrer non lues
        if ($request->has('unread')) {
            $query->where('is_read', false);
        }

        $notifications = $query->latest()->paginate(20);

        return response()->json([
            'success' => true,
            'notifications' => $notifications
        ], 200);
    }

    /**
     * Compter les notifications non lues
     */
    public function unreadCount()
    {
        $count = Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->count();

        return response()->json([
            'success' => true,
            'unread_count' => $count
        ], 200);
    }

    /**
     * Marquer une notification comme lue
     */
    public function markAsRead($id)
    {
        $notification = Notification::where('user_id', auth()->id())
            ->where('id', $id)
            ->first();

        if (!$notification) {
            return response()->json([
                'success' => false,
                'message' => 'Notification non trouvée'
            ], 404);
        }

        $notification->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'Notification marquée comme lue'
        ], 200);
    }

    /**
     * Marquer toutes les notifications comme lues
     */
    public function markAllAsRead()
    {
        Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Toutes les notifications ont été marquées comme lues'
        ], 200);
    }

    /**
     * Supprimer une notification
     */
    public function destroy($id)
    {
        $notification = Notification::where('user_id', auth()->id())
            ->where('id', $id)
            ->first();

        if (!$notification) {
            return response()->json([
                'success' => false,
                'message' => 'Notification non trouvée'
            ], 404);
        }

        $notification->delete();

        return response()->json([
            'success' => true,
            'message' => 'Notification supprimée'
        ], 200);
    }

    /**
     * Créer une notification (helper pour tester)
     */
    public function store(Request $request)
    {
        $notification = Notification::create([
            'user_id' => auth()->id(),
            'type' => $request->type ?? 'general',
            'title' => $request->title,
            'message' => $request->message,
            'data' => $request->data,
        ]);

        return response()->json([
            'success' => true,
            'notification' => $notification
        ], 201);
    }
}