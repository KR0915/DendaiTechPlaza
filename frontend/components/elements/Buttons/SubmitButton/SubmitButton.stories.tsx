import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SubmitButton from './SubmitButton';

/**
 * ## SubmitButton コンポーネントの Storybook
 * 
 * SubmitButton コンポーネントの様々な状態と
 * 設定を示す複数のストーリーが含まれています。
 * 
 * SubmitButtonは主にformを送信する際に使用する汎用的なボタンになります。
 * 
 * どんどん使おう
 * 
 * SubmitButton の Storybook 設定
 */
const meta: Meta<typeof SubmitButton> = {
    title: 'Components/elements/Buttons/SubmitButton/SubmitButton',
    component: SubmitButton,
    tags: ['autodocs'],
    argTypes: {
        width: { control: 'text' },
        height: { control: 'text' },
        preText: { control: 'text' },
        postText: { control: 'text' },
        disabled: { control: 'boolean' },
        padding: { control: 'text' },
        fontSize: { control: 'text' },
        fontweight: { control: 'text' },
        baseColor: { control: 'text' },
        hoverColor: { control: 'text' },
        baseTextColor: { control: 'text' },
        hoverTextColor: { control: 'text' },
        borderRadius: { control: 'text' },
        borderWidth: { control: 'text' },
        borderColor: { control: 'text' },
        borderStyle: { control: 'text' },
        isLoaderRight: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

/**
 * SubmitButton のデフォルト状態
 */
export const Default: Story = {
    args: {
        preText: 'Submit',
        postText: 'Submitting',
        disabled: false,
        padding: 'px-4 py-2',
        baseColor: 'bg-DendaiTechBlue',
        hoverColor: 'hover:bg-DendaiTechBlue/75',
        baseTextColor: 'text-white',
        hoverTextColor: 'text-white',
    },
};

/**
 * ローディングスピナー付きの無効状態の SubmitButton
 */
export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};


/**
 * カスタムカラーの SubmitButton
 */
export const CustomColors: Story = {
    args: {
        ...Default.args,
        baseColor: 'bg-green-500',
        hoverColor: 'hover:bg-green-600',
        baseTextColor: 'text-black',
        hoverTextColor: 'text-white',
    },
};

/**
 * 大きめのパディングを持つ SubmitButton
 */
export const LargePadding: Story = {
    args: {
        ...Default.args,
        padding: 'px-8 py-4',
    },
};

/**
 * カスタムボーダースタイルの SubmitButton
 */
export const WithBorder: Story = {
    args: {
        ...Default.args,
        borderRadius: 'rounded-lg',
        borderWidth: 'border-2',
        borderColor: 'border-blue-500',
        borderStyle: 'border-solid',
    },
};

/**
 * ローディングスピナーが右側にある SubmitButton
 */
export const LoaderRight: Story = {
    args: {
        ...Default.args,
        disabled: true,
        isLoaderRight: true,
    },
};

/**
 * カスタムフォントサイズと太さの SubmitButton
 */
export const CustomFont: Story = {
    args: {
        ...Default.args,
        fontSize: 'text-lg',
        fontweight: 'font-bold',
    },
};

/**
 * 有効状態と無効状態を切り替えられるインタラクティブな SubmitButton
 */
export const Interactive: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => {
        const [isDisabled, setIsDisabled] = useState(args.disabled);
        return (
            <button onClick={() => setIsDisabled(!isDisabled)}>
                <SubmitButton
                    preText={'ログイン'}
                    postText={'ログイン中'}
                    disabled={isDisabled}
                    padding={args.padding}
                    fontSize={args.fontSize}
                    fontweight={args.fontweight}
                    baseColor={args.baseColor}
                    hoverColor={args.hoverColor}
                    baseTextColor={args.baseTextColor}
                    hoverTextColor={args.hoverTextColor}
                    borderRadius={args.borderRadius}
                    borderWidth={args.borderWidth}
                    borderColor={args.borderColor}
                    borderStyle={args.borderStyle}
                    isLoaderRight={args.isLoaderRight}
                    width={args.width}
                    height={args.height}
                />
            </button>
        );
    },
};

export const CustomSize: Story = {
    args: {
        ...Default.args,
        width: 'w-64',
        height: 'h-16',
        preText: 'Custom Size Button',
    },
};