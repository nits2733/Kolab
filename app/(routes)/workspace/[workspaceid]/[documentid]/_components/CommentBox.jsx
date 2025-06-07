"use client";
import { useThreads } from "@liveblocks/react";
import { Composer, Thread } from "@liveblocks/react-ui";

function CommentBox() {
  const { threads } = useThreads();
  return (
    <div className="w-[300px] h-[350px] shadow-lg rounded-lg overflow-auto z-30 bg-white border border-gray-200">
      <style jsx>{`
        :global(.lb-composer) {
          min-height: 40px !important;
        }
        :global(.lb-composer-editor) {
          min-height: 32px !important;
          padding: 4px 8px !important;
        }
        :global(.lb-composer-editor-content) {
          min-height: 24px !important;
        }
        :global(.lb-thread-composer) {
          margin-top: 8px !important;
          margin-bottom: 8px !important;
        }
      `}</style>

      <div className="p-2 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-sm text-gray-800 flex items-center gap-2">
          <span className="text-blue-500">💬</span>
          Comments
        </h3>
      </div>

      {threads?.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}

      {threads?.length === 0 && (
        <div className="flex flex-col items-center justify-center text-gray-500 text-sm py-6">
          <div className="text-xl mb-1">💭</div>
          <div className="font-medium text-xs">No comments yet</div>
          <div className="text-xs text-gray-400 mt-1">
            Start a conversation below
          </div>
        </div>
      )}

      <Composer className="z-10">
        <Composer.Submit className="btn-primary" style={{ color: "#ffffff" }}>
          Reply
        </Composer.Submit>
      </Composer>
    </div>
  );
}

export default CommentBox;
