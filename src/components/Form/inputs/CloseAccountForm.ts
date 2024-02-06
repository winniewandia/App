import type {Form} from '@src/types/onyx';

const INPUT_IDS = {
    REASON_FOR_LEAVING: 'reasonForLeaving',
    PHONE_OR_EMAIL: 'phoneOrEmail',
} as const;

type CloseAccountForm = Form<{
    [INPUT_IDS.REASON_FOR_LEAVING]: string;
    [INPUT_IDS.PHONE_OR_EMAIL]: string;
}>;

export default CloseAccountForm;
export {INPUT_IDS};
