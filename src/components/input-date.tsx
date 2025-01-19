import React, { useState, forwardRef } from 'react';
import { Input } from './ui/input';
import { ControllerRenderProps } from 'react-hook-form';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    readOnly?: boolean;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps & ControllerRenderProps>(
    ({ readOnly = false, ...field }, ref) => {
        const [value, setValue] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value.replace(/\D/g, '');
            let formattedValue = '';

            if (input.length > 0) {
                formattedValue += input.substring(0, 2);
            }
            if (input.length >= 2) {
                formattedValue += '/' + input.substring(2, 4);
            }

            setValue(formattedValue);
            field.onChange(formattedValue);
        };

        return (
            <Input
                {...field}
                ref={ref}
                readOnly={readOnly}
                placeholder="MM/YY"
                value={value}
                onChange={handleChange}
                maxLength={5}
            />
        );
    }
);

DateInput.displayName = 'DateInput';

export default DateInput;
