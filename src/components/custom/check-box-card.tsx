import { Checkbox } from '../ui/checkbox';
import Typography from './typography';

interface CheckboxCardProps {
  checked?: boolean;
  title?: string;
  description?: string;
}
const CheckboxCard: React.FC<CheckboxCardProps> = ({
  checked,
  title,
  description,
}) => {
  return (
    <div className="mb-4 w-full flex gap-2 flex-col">
      <Checkbox size="large" checked={checked} disabled={!checked} />
      <div className="flex flex-col gap-2">
        <Typography
          as={'label'}
          variant="base"
          weight="bold"
          color={checked ? 'text-neutral-100' : 'text-black'}
          className="mb-2"
        >
          {title}
        </Typography>
        <Typography
          variant="small"
          color={checked ? 'text-neutral-100' : 'text-black'}
          className="mb-2"
        >
          {description}
        </Typography>
        <Typography
          variant="small"
          weight="bold"
          color={checked ? 'text-success-300' : 'text-neutral-100'}
          className="mb-2"
        >
          {checked ? 'Completed' : 'Up-next'}
        </Typography>
      </div>
    </div>
  );
};
export default CheckboxCard;
