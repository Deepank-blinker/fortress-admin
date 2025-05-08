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
  edit = false,
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
        iconSize: '8rem',
        instructionText: [''],
        dropzoneText: '',
        onlyIcon: true,
        className:
          'w-[100px] h-[100px] flex justify-center items-center overflow-hidden !opacity-100',
        previewClassName:
          'rounded-full w-[100px] h-[100px] overflow-hidden lg:w-[100px] lg:h-[100px] !mb-0 lg:!mb-0 ',

        uploadedFileUrl: previewUrl,
        showUploadedUrlPreview: showUploadedUrlPreview,
        onRemoveFilePreview,
      }}
      disabled={!edit}
    />
  );
};
export default ProfileImageFormField;
