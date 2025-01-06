import React from 'react';

export function Colors(props) {
        return (
                <div
                        style={{
                                backgroundColor: `var(--${props.color})`,
                                padding: '1rem',
                        }}>
                        {props.color}
                </div>
        );
}
