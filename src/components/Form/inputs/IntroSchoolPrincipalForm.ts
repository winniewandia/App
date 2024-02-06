import type {Form} from '@src/types/onyx';

const INPUT_IDS = {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    PARTNER_USER_ID: 'partnerUserID',
} as const;

type IntroSchoolPrincipalForm = Form<{
    [INPUT_IDS.FIRST_NAME]: string;
    [INPUT_IDS.LAST_NAME]: string;
    [INPUT_IDS.PARTNER_USER_ID]: string;
}>;

export default IntroSchoolPrincipalForm;
export {INPUT_IDS};
