// import { useState } from 'react';
// import CloutModal from '@/components/CloutModal';
// import CreatePost from './CreatePost';
// import Create from './Create';
// import Crop from './Crop';

// interface CreatePostFlowProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// type Step = 'create' | 'crop' | 'post';

// export default function CreatePostFlow({ isOpen, onClose }: CreatePostFlowProps) {
//   const [step, setStep] = useState<Step>('create');
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [aspect, setAspect] = useState(1);
//   const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
//   const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);

//   const reset = () => {
//     setStep('create');
//     setImageSrc(null);
//     setAspect(1);
//     setCroppedBlob(null);
//     setCroppedPreviewUrl(null);
//   };

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   const handleFileSelected = (file: File) => {
//     setImageSrc(URL.createObjectURL(file));
//     setStep('crop');
//   };

//   const handleCropComplete = (blob: Blob, previewUrl: string, usedAspect: number) => {
//     setCroppedBlob(blob);
//     setCroppedPreviewUrl(previewUrl);
//     setAspect(usedAspect);
//     setStep('post');
//   };

//   if (step === 'crop' && imageSrc) {
//     return (
//       <Crop
//         imageSrc={imageSrc}
//         initialAspect={aspect}
//         onCancel={() => setStep(croppedBlob ? 'post' : 'create')}
//         onComplete={handleCropComplete}
//       />
//     );
//   }

//   if (step === 'post' && croppedBlob && croppedPreviewUrl) {
//     return (
//       <CloutModal isOpen={isOpen} onClose={handleClose} title="New Post">
//         <CreatePost
//           imageBlob={croppedBlob}
//           imagePreviewUrl={croppedPreviewUrl}
//           aspect={aspect}
//           onEditCrop={() => setStep('crop')}
//           onPosted={handleClose}
//         />
//       </CloutModal>
//     );
//   }

//   return (
//     <CloutModal isOpen={isOpen} onClose={handleClose} title="Create">
//       <Create onSelectFile={handleFileSelected} />
//     </CloutModal>
//   );
// }