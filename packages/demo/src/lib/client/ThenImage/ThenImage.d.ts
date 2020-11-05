import React from 'react';
import Image from 'next/image';
declare type Props = {
    placeholder?: string;
    transition?: boolean;
} & React.ComponentProps<typeof Image>;
declare const ThenImage: ({ placeholder, transition, ...rest }: Props) => JSX.Element;
export default ThenImage;
