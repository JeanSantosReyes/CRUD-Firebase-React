export interface TutorialInterface {
    title: string;
    description: string;
    published?: boolean;
}

export interface TutorialApi extends TutorialInterface {
    key: string | null;
}