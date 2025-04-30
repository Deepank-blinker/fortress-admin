'use client';
import React, { JSX } from 'react';

type TypographyProps = {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'large'
    | 'base'
    | 'small'
    | 'x-small';
  weight?: 'regular' | 'medium' | 'bold' | 'semibold';
  color?: string;
  as?: React.ElementType; // Allows overriding the default tag
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement> &
  React.LabelHTMLAttributes<HTMLLabelElement> &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

function Typography({
  variant,
  weight = 'regular',
  color = 'text-neutral-900',
  as,
  children,
  className,
  required = false, // Destructure `required` from props, with a default value of false
  ...props
}: TypographyProps) {
  const styles: Record<string, string> = {
    h1: 'text-[2.4rem] leading-[2.75rem]',
    h2: 'text-4xl leading-[2.5rem]',
    h3: 'text-[2rem] leading-[2.2rem]',
    h4: 'text-[1.8rem] leading-[1.9rem]',
    h5: 'text-2xl leading-[1.65rem]',
    h6: 'text-xl leading-[1.4rem]',
    large: 'text-lg leading-[1.35rem]',
    base: 'text-base leading-[1.2rem]',
    small: 'text-sm leading-[1.05rem]',
    'x-small': 'text-[0.65rem] leading-[0.75rem]',
  };

  const variantToTag: Record<
    TypographyProps['variant'],
    keyof JSX.IntrinsicElements
  > = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    large: 'p',
    base: 'p',
    small: 'p',
    'x-small': 'p',
  };

  const Component: React.ElementType = (as ||
    variantToTag[variant]) as React.ElementType;

  // Conditionally add the '*' if required is true
  const modifiedChildren = required ? (
    <>
      {children}
      <span className="text-red-500"> *</span>
    </>
  ) : (
    children
  );

  return (
    <Component
      className={` ${styles[variant]} ${
        weight === 'regular' ? 'font-medium' : `font-${weight}`
      } ${color} ${className}`}
      {...props} // Pass down all additional props
    >
      {modifiedChildren}
    </Component>
  );
}

export default Typography;
