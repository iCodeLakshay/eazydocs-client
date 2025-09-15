'use client'
import React from 'react'
import { createPortal } from 'react-dom'
import { X, Trash2, AlertTriangle } from 'lucide-react'
import { Button } from "@heroui/button"

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, blogTitle, loading }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Delete Blog</h2>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete this blog post?
          </p>
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="font-medium text-gray-900 line-clamp-2">"{blogTitle}"</p>
          </div>
          <p className="text-sm text-red-600 font-medium">
            This action cannot be undone. The blog post will be permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <Button
            variant="bordered"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-500 text-white hover:bg-red-600 flex items-center gap-2 rounded-md"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Blog
              </>
            )}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default DeleteConfirmModal