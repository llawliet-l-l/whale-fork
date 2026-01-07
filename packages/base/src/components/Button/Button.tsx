import type { ButtonProps } from './Button.types.js';

import clsx from 'clsx';
import { Slot as SlotPrimitive } from 'radix-ui'; // 1. Rename import to avoid naming collision
import React, { forwardRef, useId } from 'react';

import { buttonStyle, skeletonStyle } from './Button.css.js';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      intent = 'primary',
      variant = 'filled',
      size = 'medium',
      rounded = true,
      fullWidth = false,
      preloaded = false,
      asChild = false,
      isSelected,
      prefix,
      suffix,
      className,
      children,
      id,
      ...nativeProps
    } = props;

    const defaultId = useId();
    const buttonId = id ?? `w-btn-${defaultId}`;

    // 2. Access the component inside the Namespace
    const Comp = asChild ? SlotPrimitive.Slot : 'button';

    if (preloaded) {
      return (
        <div
          aria-hidden="true"
          className={clsx(
            skeletonStyle({ size, rounded, fullWidth }),
            className,
          )}
        />
      );
    }

    return (
      <Comp
        ref={ref}
        id={buttonId}
        aria-pressed={isSelected}
        className={clsx(
          buttonStyle({ size, rounded, intent, variant, fullWidth }),
          className,
        )}
        {...nativeProps}>
        {asChild ? (
          children
        ) : (
          <>
            {prefix && (
              <span aria-hidden="true" className="w-btn__prefix">
                {prefix}
              </span>
            )}
            <span className="w-btn__content">{children}</span>
            {suffix && (
              <span aria-hidden="true" className="w-btn__suffix">
                {suffix}
              </span>
            )}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
