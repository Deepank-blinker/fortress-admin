import FormField from '@/components/custom/form-field';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface ProfilePictureForFieldProps {
  name?: string;
  edit?: boolean;
  previewUrl?: string;
  showUploadedUrlPreview?: boolean;
  onRemoveFilePreview?: () => void;
}

const ProfileImageFormField: React.FC<ProfilePictureForFieldProps> = ({
  name = 'profilePicture',
  // edit = false,
  previewUrl = '',
  showUploadedUrlPreview = true,
  onRemoveFilePreview = () => {},
}) => {
  return (
    <FormField
      as="file"
      name={name}
      fileProps={{
        icon: UserCircleIcon,
        iconColor: 'text-neutral-40',
        iconClassName: 'text-neutral-40',
        iconSize: '12rem',
        instructionText: [''],
        dropzoneText: '',
        onlyIcon: true,
        className:
          '!w-[10rem] !h-[10rem] flex justify-center items-center overflow-hidden !opacity-100 !cursor-default !disabled:opacity-100 !disabled:default',
        previewClassName:
          'rounded-full !w-[10rem] !h-[10rem] overflow-hidden lg:w-[10rem] lg:h-[10rem] !mb-0 lg:!mb-0 !opacity-100 !cursor-default !disabled:opacity-100 !disabled:default',

        uploadedFileUrl: previewUrl,
        showUploadedUrlPreview: showUploadedUrlPreview,
        onRemoveFilePreview,
        hideRemoveButton: true,
      }}
      // disabled={!edit}
    />
  );
};
export default ProfileImageFormField;
