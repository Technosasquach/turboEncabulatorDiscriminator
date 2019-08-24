export enum EQuestionType {
    Multi = "MULTI",
    Numerical = "NUMBER",
    Short = "SHORT",
    Bool = "YESORNO"
}

export interface IQuestion {
    question: string;
    type: EQuestionType;
    content?: string[];
    followup?: IQuestion;
}

export const Questions: IQuestion[] = [
    {
        question: "Have you driven on a full moon recently?",
        type: EQuestionType.Bool
    },
    {
        question: "Have you performed a blood sacrifice to fix it?",
        type: EQuestionType.Bool
    },
    {
        question: "Have you driven near any indian burial sites recently?",
        type: EQuestionType.Bool,
        followup: {
            question: "Where was this indian burial site?",
            type: EQuestionType.Short
        }
    },
    {
        question: "If there is a sound, what does it sound like?",
        type: EQuestionType.Short
    },
    {
        question: "If there is a sound, where is it coming from?",
        type: EQuestionType.Short
    },
    {
        question: "If there is a sound, dose it sound like a dead relative?",
        type: EQuestionType.Short
    },
    {
        question: "Do you follow any of the current faiths?",
        type: EQuestionType.Multi,
        content: [
            "Flying Spagetti Monster",
            "Satanism",
            "Voodoo",
            "Heka (Ancient Egyption Gods)",
            "Jediism",
            "N/A",
        ]
    },
    {
        question: "How many bridges have driven under in the past week?",
        type: EQuestionType.Numerical
    },
    {
        question: "How many black cats have you seen in the past month?",
        type: EQuestionType.Numerical
    },
    {
        question: "Are you currently in possession of a umbrella",
        type: EQuestionType.Bool,
        followup: {
            question: "What colours or patterns dose this umbrella posses",
            type: EQuestionType.Short
        }
    },
    {
        question: "Have you broken your headlights / any mirrors recently?",
        type: EQuestionType.Bool,
        followup: {
            question: "How many headlights are broken / mirrors?",
            type: EQuestionType.Numerical
        }
    },
    {
        question: "Have you tried to 'persuade' your car in any way in the last 49 hours?",
        type: EQuestionType.Bool,
        followup: {
            question: "How many beatings did it receive?",
            type: EQuestionType.Numerical
        }
    },
    {
        question: "How many stop signs have you ran over?",
        type: EQuestionType.Numerical,
    },
    {
        question: "Would you consider your self a bad driver?",
        type: EQuestionType.Bool,
    },
    {
        question: "How many accidents have you been in?",
        type: EQuestionType.Numerical,
    },
    {
        question: "When did you last check your tire pressure?",
        type: EQuestionType.Multi,
        content: [
            "Last Day",
            "Last Week",
            "Last Month",
            "Never",
            "My tires are pressurized?!"
        ]
    },
    {
        question: "Have you been leaking black stuff out of your engine bay?",
        type: EQuestionType.Bool,
        followup: {
            question: "Estimate in olympic swimming pools, how much has been lost",
            type: EQuestionType.Numerical
        }
    },
    {
        question: "When did you last check your blinker fluid",
        type: EQuestionType.Multi,
        content: [
            "Last Day",
            "Last Week",
            "Last Month",
            "Last Year",
            "Still running OEM",
            "Never",
        ]
    }
]