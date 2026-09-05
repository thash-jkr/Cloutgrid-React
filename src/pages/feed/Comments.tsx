import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CloutEmpty from '@/components/CloutEmpty';
import { addComment, deleteComment, fetchComments } from '@/slices/feedSlice';
import { timeAgo } from '@/utils/timeAgo';
import { faTrash, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import comment from '@/assets/isometric/comment.png';
import { IconButton, TextField } from 'actify';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import CloutAlert from '@/components/CloutAlert';
import toast, { Toaster } from 'react-hot-toast';

interface CommentProps {
  id: number;
}

const Comments = ({ id }: CommentProps) => {
  const [text, setText] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedComment, setSelectedComment] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { comments, feedLoading } = useAppSelector((state) => state.feed);

  const MAX_ROWS = 5;
  const CHARS_PER_ROW = 20;

  const newlineRows = text.split('\n').length;
  const charRows = Math.ceil(text.length / CHARS_PER_ROW);
  const rowCount = Math.min(Math.max(newlineRows, charRows, 1), MAX_ROWS);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <Toaster />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {comments.length > 0 ? (
          <ul className="w-full divide-y">
            {comments.map((comment) => (
              <li key={comment.id} className="group/item w-full">
                <div className="flex w-full items-center justify-between gap-1 p-2 hover:bg-slate-50">
                  <div className="flex w-full items-start justify-center gap-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={comment.user.profile_photo}
                      alt="Profile"
                    />
                    <div className="flex w-full flex-col">
                      <span className="text-sm font-semibold">{comment.content}</span>
                      <span className="text-xs text-slate-500">
                        {comment.user.name} • {timeAgo(comment.commented_at)}
                      </span>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={comment.user.username == user?.username ? faTrash : faWarning}
                    className="text-gray-200 opacity-0 transition-opacity duration-200
                group-hover/item:opacity-100 hover:text-secondary"
                    onClick={() => {
                      setSelectedComment(comment.id);
                      comment.user.username == user?.username
                        ? setConfirmDelete(true)
                        : setShowReport(true);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <CloutEmpty icon={comment} message="No comments yet!" isLoading={feedLoading} />
        )}
      </div>

      <div className="w-full shrink-0 p-3 border-t">
        <TextField
          label="Comment"
          type="textarea"
          variant="outlined"
          leadingIcon={
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={user?.profile_photo}
              alt="Profile"
            />
          }
          trailingIcon={
            <IconButton
              onPress={() => {
                dispatch(addComment({ postId: id, content: text }));
                setText('');
              }}
              isDisabled={text.length == 0}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="rotate-45 cursor-pointer" />
            </IconButton>
          }
          inputProps={
            {
              rows: rowCount,
              value: text,
              onChange: (q) => setText(q.target.value),
            } as React.InputHTMLAttributes<HTMLInputElement>
          }
        />
      </div>

      <CloutAlert
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        onSubmit={() => setShowReport(false)}
        title={'Report Comment'}
        body={
          'If you think this comment violated our terms of service, let us know and we wil take necessary actions'
        }
        textField={true}
      />

      <CloutAlert
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onSubmit={() => {
          if (selectedComment) {
            dispatch(deleteComment({ postId: id, commentId: selectedComment }))
              .unwrap()
              .then(() => {
                toast.success('Comment deleted!');
                setConfirmDelete(false);
              })
              .catch((e) => toast.error('Failed to delete comment: ' + e));
          }
        }}
        title={'Delete Comment'}
        body={'Do you want to delete this comment?'}
      />
    </div>
  );
};

export default Comments;
