'use client';
import { getErrorMessage } from '@/utils';
import {
  DocumentIcon,
  IdentificationIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import Typography from './typography';

export interface FileUploadProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSize?: number | string;
  iconColor?: string;
  iconClassName?: string;
  instructionText?: string[];
  dropzoneText?: string;
  note?: string;
  onFileDrop?: (_files: File[]) => void;
  onFileRemove?: () => void;
  isCamera?: boolean;
  uploadedFileUrl?: string;
  showUploadedUrlPreview?: boolean;
  onRemoveFilePreview?: () => void;
  isAboveLgWidthFull?: boolean;
  acceptFileTypes?: string[];
  files?: File[];
  className?: string;
  previewClassName?: string;
  onlyIcon?: boolean;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  icon: Icon = IdentificationIcon,
  iconSize = '3rem',
  iconColor = '#65BD50',
  iconClassName = '',
  instructionText = ['Drag and drop or', 'Click to upload from device'],
  dropzoneText = 'Accepted file types: bmp, gif, heic, jpeg, pdf, png, webp Max. file size: 5 MB, Max. files: 1.',
  // note = 'Note: The document should not be older than 3 months',
  note = '',
  onFileDrop = () => {},
  onFileRemove = () => {},
  isCamera = false,
  uploadedFileUrl,
  showUploadedUrlPreview,
  onRemoveFilePreview,
  isAboveLgWidthFull,
  acceptFileTypes,
  files = [],
  className = '',
  previewClassName = '',
  onlyIcon = false,
  disabled = false,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] =
    useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fileType, setFileType] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [hasImageError, setHasImageError] = useState(false);

  const validateImageResolution = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < 480 || img.height < 480) {
          toast.error(
            'The image resolution is too small. Minimal resolution is 480 px.'
          );
          resolve(false);
        } else if (img.width > 7000 || img.height > 7000) {
          toast.error(
            'The image resolution is too huge. The maximum resolution is 7000 px.'
          );
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => resolve(false);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const isValid =
          file.type === 'application/pdf' ||
          (await validateImageResolution(file));
        if (!isValid) return;

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setFileName(file.name);
        onFileDrop(acceptedFiles);
        setFileType(file.type);
      }
    },
    [onFileDrop]
  );

  useEffect(() => {
    if (files?.length > 0) {
      const file = files[0];
      validateImageResolution(file).then((isValid) => {
        if (!isValid) return;
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setFileName(file.name);
        onFileDrop(files);
        setFileType(file.type);
      });
    }
  }, [files]);
  const removeImage = () => {
    if (uploadedFileUrl && showUploadedUrlPreview) {
      onRemoveFilePreview?.();
      return;
    }
    setPreview(null);
    setIsCameraActive(isCamera);
    onFileRemove();
    setFileType('');
    setFileName('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (fileRejections) => {
      if (!disabled) {
        fileRejections.forEach((rejection) => {
          rejection.errors.forEach((err) => {
            if (err.code === 'file-too-large') {
              toast.error('File size is exceeding 5 MB.');
            } else {
              toast.error(err.message);
            }
          });
        });
      }
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    accept: acceptFileTypes?.length
      ? acceptFileTypes.reduce(
          (acc, type) => {
            acc[type] = [];
            return acc;
          },
          {} as Record<string, string[]>
        )
      : {
          'image/*': ['.bmp', '.gif', '.heic', '.jpeg', '.png', '.webp'],
          'application/pdf': ['.pdf'],
        },

    disabled,
  });

  // Start camera when the isCamera prop is true
  useEffect(() => {
    if (isCamera && !preview) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setIsCameraActive(true);
          setCameraPermissionDenied(false); // Reset permission denial state
        } catch (error) {
          console.error('Error accessing camera:', error);
          setCameraPermissionDenied(true); // Set permission denied flag
        }
      };

      startCamera();
    }
  }, [isCamera, preview, uploadedFileUrl, showUploadedUrlPreview, isClient]); // Re-trigger the effect when preview changes

  const captureImage = () => {
    try {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          const videoWidth = videoRef.current.videoWidth;
          const videoHeight = videoRef.current.videoHeight;
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;

          // Draw video frame onto canvas
          context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

          // Extract image from canvas
          const imageUrl = canvasRef.current.toDataURL('image/png');

          // Convert base64 data URL to binary Blob
          const byteString = atob(imageUrl.split(',')[1]);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const uintArray = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([uintArray], { type: 'image/png' });

          // Create the file and pass it
          const file = new File([blob], 'captured-image.png', {
            type: 'image/png',
          });

          setPreview(URL.createObjectURL(blob)); // Show preview
          onFileDrop([file]); // Trigger file drop with the proper file object
          setFileType('image/png'); // Set the file type as image
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error as Error));
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isPdfUrl = useMemo(() => {
    if (!uploadedFileUrl) return false;
    return uploadedFileUrl?.toLowerCase()?.endsWith('.pdf');
  }, [uploadedFileUrl]);

  return (
    <div
      className={`flex flex-col items-center gap-4 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} `}
    >
      {/* Show upload instructions or camera interface */}
      {(!uploadedFileUrl || (uploadedFileUrl && !showUploadedUrlPreview)) &&
        !preview &&
        !isCameraActive &&
        !cameraPermissionDenied && (
          <div
            {...getRootProps()}
            className={`${isAboveLgWidthFull ? '' : 'lg:w-3/5'} flex bg-neutral-20 self-center items-center justify-center p-2 mb-4 border ${
              isDragActive ? 'border-success-300' : 'border-neutral-40'
            } cursor-pointer  ${previewClassName}`}
          >
            <input {...getInputProps()} disabled={disabled} />
            <div className="flex flex-col items-center justify-center p-2 gap-3">
              <Icon
                color={iconColor}
                width={iconSize}
                height={iconSize}
                className={iconClassName}
              />
              {!onlyIcon && (
                <>
                  <div>
                    {instructionText.map((text, index) => (
                      <Typography
                        as={'p'}
                        key={index}
                        variant="base"
                        color="text-neutral-100"
                        className="text-center text-wrap"
                      >
                        {text}
                      </Typography>
                    ))}
                  </div>
                  <div>
                    <Typography
                      as={'p'}
                      variant="x-small"
                      color="text-neutral-100"
                    >
                      {dropzoneText}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      as={'p'}
                      variant="x-small"
                      weight="bold"
                      color="text-neutral-900"
                      className="text-center text-wrap"
                    >
                      {note}
                    </Typography>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      {/* Camera view if permissions are granted */}
      {(!uploadedFileUrl || (uploadedFileUrl && !showUploadedUrlPreview)) &&
        isCamera &&
        !preview &&
        isCameraActive && (
          <div className="lg:w-3/5 flex flex-col items-center gap-4 w-full">
            <div className="relative w-full h-48">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full border rounded"
              />
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <Button onClick={captureImage} className="mt-4" type="button">
              Capture Image
            </Button>
          </div>
        )}

      {/* Camera permission denied */}
      {(!uploadedFileUrl || (uploadedFileUrl && !showUploadedUrlPreview)) &&
        cameraPermissionDenied && (
          <div className="text-center text-red-500">
            <Typography variant="base" color="text-red-500">
              Camera access is required. Please enable camera permissions.
            </Typography>
          </div>
        )}

      {/* Image preview */}
      {preview || (uploadedFileUrl && showUploadedUrlPreview) ? (
        <div
          className={`lg:w-3/5 flex flex-col items-center gap-2 w-full  bg-neutral-20 rounded border border-neutral-30 ${previewClassName}`}
        >
          <div className="relative w-full h-48 aspect-auto overflow-hidden">
            {(fileType.startsWith('image/') ||
              (uploadedFileUrl && showUploadedUrlPreview && !isPdfUrl)) &&
            !hasImageError ? (
              <Image
                src={preview || (uploadedFileUrl as string)}
                alt="Preview"
                fill
                sizes="899"
                className="aspect-auto "
                onError={() => setHasImageError(true)}
              />
            ) : hasImageError ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <DocumentIcon className="h-12 w-12 text-neutral-60" />
                <Typography variant="small" color="text-error-300">
                  Failed to load image preview.
                </Typography>
                <Typography variant="small" className="text-neutral-100">
                  Please check the file format or try uploading again.
                </Typography>
              </div>
            ) : fileType === 'application/pdf' ||
              (uploadedFileUrl && showUploadedUrlPreview && isPdfUrl) ? (
              <iframe
                src={
                  preview ||
                  (uploadedFileUrl && showUploadedUrlPreview
                    ? uploadedFileUrl
                    : '')
                }
                title="PDF Preview"
                className="w-full  border rounded h-48 overflow-hidden"
                style={{ overflow: 'hidden' }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <DocumentIcon className="h-12 w-12 text-neutral-100" />
                <Typography variant="small" className="ml-2">
                  {fileName ||
                    preview?.split('/').pop() ||
                    uploadedFileUrl?.split('/').pop() ||
                    'Document Preview'}
                </Typography>
              </div>
            )}
            {!disabled && (
              <Button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-gray-200"
              >
                <XCircleIcon className="h-6 w-6 text-red-500" />
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
