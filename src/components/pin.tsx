import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
    check?: boolean;
    onCheckChange?: (check: boolean) => void;
}
const Pin = ({ check, onCheckChange, ...restProps }: PinProps) => {
    return (
        <Rate
        count={1}
        value={check ? 1 : 0}
        onChange={(num) => onCheckChange?.(!!num)}
        {...restProps}
        />
    );
};

export default Pin;
