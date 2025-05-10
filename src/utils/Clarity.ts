import Clarity from '@microsoft/clarity';

const projectId = "pvs08hnwmz"

interface IdentifyUserPropsType {
    customId: string;
    customSessionId?: string;
    customPageId?: string;
    friendlyName?:string;
}

export const startClarity = (): void => {
    Clarity.init(projectId);
};

export const setClarityTag = (key: string, value: string | string[]) => {
    Clarity.setTag(key, value);
};

export const identifyUser = (IdentifyUserProps:IdentifyUserProps) => {
    Clarity.identify(IdentifyUserProps.customId, IdentifyUserProps.customSessionId, IdentifyUserProps.customPageId, IdentifyUserProps.friendlyName);
};

