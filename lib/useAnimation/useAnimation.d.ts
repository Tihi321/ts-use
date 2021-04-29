/// <reference types="react" />
export declare type TUseAnimationProps = {
    delay?: number;
    onHidden?: () => void;
};
export declare const useAnimation: (props?: TUseAnimationProps | undefined) => {
    visible: boolean;
    onAnimationEnd: (event?: Event | undefined) => void;
};
//# sourceMappingURL=useAnimation.d.ts.map