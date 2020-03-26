let input = {
    "questions": [
        {
            "number": 1,
            "question": {
                "title": "Region",
                "text": "What is the region in which your company has registered headquarters for legal and taxation purposes. There are different initiatives which apply in the different regions."
            },
            "type": "single",
            "prerequisites": [],
            "answers": [
                {
                    "text": "England",
                    "value": "a"
                },
                {
                    "text": "Wales",
                    "value": "b"
                },
                {
                    "text": "Scotland",
                    "value": "c"
                }
            ]
        },
        {
            "number": 2,
            "question": {
                "title": "How many Employees do you have?",
                "text": "How many people does you company employ, including directors and part-time staff. Staff are those you must pay PAYE and/or National Insurance for. Do not count sub-contractors or self-employed people you have working for you. What about Zero-hours staff?"
            },
            "type": "single",
            "prerequisites": [],
            "answers": [
                {
                    "text": "0",
                    "value": "a"
                },
                {
                    "text": "01-Oct",
                    "value": "b"
                },
                {
                    "text": "Nov-49",
                    "value": "c"
                }
            ]
        },
        {
            "number": 3,
            "question": {
                "title": "What is your turnover?",
                "text": "What was your turnover in the last finanical year? Those you had in your last set of accounts or your tax return."
            },
            "type": "single",
            "prerequisites": [],
            "answers": [
                {
                    "text": "Less than £45m",
                    "value": "a"
                },
                {
                    "text": "More than £45m",
                    "value": "b"
                }
            ]
        },
        {
            "number": 4,
            "question": {
                "title": "What taxes do you pay?",
                "text": ""
            },
            "type": "multi",
            "prerequisites": [],
            "answers": [
                {
                    "text": "VAT",
                    "value": "a"
                },
                {
                    "text": "Corporation Tax",
                    "value": "b"
                },
                {
                    "text": "Income Tax",
                    "value": "c"
                }
            ]
        },
        {
            "number": 5,
            "question": {
                "title": "Which sector is your business in?",
                "text": "There are different schemes being offered specifically for different sectors."
            },
            "type": "multi",
            "prerequisites": [],
            "answers": [
                {
                    "text": "Hospitality",
                    "value": "a"
                },
                {
                    "text": "Retail",
                    "value": "b"
                },
                {
                    "text": "Leisure",
                    "value": "c"
                }
            ]
        },
        {
            "number": 6,
            "question": {
                "title": "Do you rent business premises?",
                "text": ""
            },
            "type": "single",
            "prerequisites": [],
            "answers": [
                {
                    "text": "Yes",
                    "value": "a"
                },
                {
                    "text": "No",
                    "value": "b"
                }
            ]
        },
        {
            "number": 7,
            "question": {
                "title": "English rate relief",
                "text": "Do you receive any of the following rate reliefs?"
            },
            "type": "single",
            "prerequisites": [
                "1a"
            ],
            "answers": [
                {
                    "text": "Small business rate relief",
                    "value": "a"
                },
                {
                    "text": "Rural rate relief",
                    "value": "b"
                },
                {
                    "text": "None of above",
                    "value": "c"
                }
            ]
        },
        {
            "number": 8,
            "question": {
                "title": "Welsh business rates",
                "text": "What is your business rate level?"
            },
            "type": "single",
            "prerequisites": [
                "1b"
            ],
            "answers": [
                {
                    "text": "Less than £12,000",
                    "value": "a"
                },
                {
                    "text": "More than £12,000",
                    "value": "b"
                }
            ]
        },
        {
            "number": 9,
            "question": {
                "title": "Scottish rate relief",
                "text": "Do you receive any of the following rate reliefs?"
            },
            "type": "single",
            "prerequisites": [
                "1c"
            ],
            "answers": [
                {
                    "text": "Small business bonus scheme",
                    "value": "a"
                },
                {
                    "text": "Rural rate relief",
                    "value": "b"
                },
                {
                    "text": "None of above",
                    "value": "c"
                }
            ]
        },
        {
            "number": 10,
            "question": {
                "title": "Northern Ireland business rates",
                "text": "What is your business rate level?"
            },
            "type": "single",
            "prerequisites": [
                "1d"
            ],
            "answers": [
                {
                    "text": "Less than £15,000",
                    "value": "a"
                },
                {
                    "text": "More than £15,000",
                    "value": "b"
                }
            ]
        }
    ],
    "responses": [
        {
            "number": 1,
            "guidance": {
                "title": "Business interruption loans",
                "text": "Here is some information on Buisness interruption Loans"
            },
            "prerequisites": [
                "3a"
            ],
            "links": [
                {
                    "text": "Business Interruption Loans",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                },
                {
                    "text": "British Business Bank",
                    "url": "https://www.british-business-bank.co.uk/ourpartners/coronavirus-business-interruption-loan-scheme-cbils/"
                }
            ]
        },
        {
            "number": 2,
            "guidance": {
                "title": "80% Wage Funding",
                "text": "Good news on the 80% wage funding"
            },
            "prerequisites": [
                "2b",
                "2c",
                "2d",
                "2e"
            ],
            "links": [
                {
                    "text": "80% Wage Funding",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                }
            ]
        },
        {
            "number": 3,
            "guidance": {
                "title": "SSP relief",
                "text": "Its time for SSP relief"
            },
            "prerequisites": [
                "2b",
                "2c",
                "2d"
            ],
            "links": [
                {
                    "text": "SSP relief",
                    "url": "https://www.gov.uk/employers-sick-pay"
                }
            ]
        },
        {
            "number": 4,
            "guidance": {
                "title": "VAT deferral",
                "text": "Nobody likes VAT"
            },
            "prerequisites": [
                "4a"
            ],
            "links": [
                {
                    "text": "VAT deferral",
                    "url": "https://www.gov.uk/difficulties-paying-hmrc"
                }
            ]
        },
        {
            "number": 5,
            "guidance": {
                "title": "Income Tax referral",
                "text": "Everyone hates Income Tax!"
            },
            "prerequisites": [
                "4c"
            ],
            "links": [
                {
                    "text": "Income Tax referral",
                    "url": "https://www.gov.uk/difficulties-paying-hmrc"
                }
            ]
        },
        {
            "number": 6,
            "guidance": {
                "title": "HMRC time to pay",
                "text": "HMRC giving us time to pay…. Who'd have thought it"
            },
            "prerequisites": [
                "4b"
            ],
            "links": [
                {
                    "text": "HMRC time to pay",
                    "url": "https://www.gov.uk/guidance/apply-for-more-time-to-file-your-companys-accounts"
                }
            ]
        },
        {
            "number": 7,
            "guidance": {
                "title": "£10k grant in England",
                "text": "English Grants"
            },
            "prerequisites": [
                "1a+7a",
                "1a+7b"
            ],
            "links": [
                {
                    "text": "£10k grant",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                }
            ]
        },
        {
            "number": 8,
            "guidance": {
                "title": "£10k grant in Wales",
                "text": "Welsh Grants"
            },
            "prerequisites": [
                "1b+8a"
            ],
            "links": [
                {
                    "text": "£10k grant",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                }
            ]
        },
        {
            "number": 9,
            "guidance": {
                "title": "£10k grant in Scotland",
                "text": "Scottich Grants…. Tastes nice!"
            },
            "prerequisites": [
                "1c+9a",
                "1c+9b"
            ],
            "links": [
                {
                    "text": "£10k grant",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                }
            ]
        },
        {
            "number": 10,
            "guidance": {
                "title": "£10k grant in Northern Ireland",
                "text": "NI Grants"
            },
            "prerequisites": [
                "1d+10a"
            ],
            "links": [
                {
                    "text": "£10k grant",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                }
            ]
        },
        {
            "number": 11,
            "guidance": {
                "title": "£25k grant for specific sectors in England",
                "text": "Sector specific England"
            },
            "prerequisites": [
                "1a+5a",
                "1a+5b",
                "1a+5c"
            ],
            "links": [
                {
                    "text": "£25k grant sector support",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                }
            ]
        },
        {
            "number": 12,
            "guidance": {
                "title": "£25k grant for specific sectors in Wales",
                "text": "Sector specific Wales"
            },
            "prerequisites": [
                "1b+5a",
                "1b+5b",
                "1b+5c"
            ],
            "links": [
                {
                    "text": "£25k grant sector support",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                }
            ]
        },
        {
            "number": 13,
            "guidance": {
                "title": "£25k grant for specific sectors in Scotland",
                "text": "Sector specific Scotland"
            },
            "prerequisites": [
                "1c+5a",
                "1c+5b",
                "1c+5c"
            ],
            "links": [
                {
                    "text": "£25k grant sector support",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                }
            ]
        },
        {
            "number": 14,
            "guidance": {
                "title": "£25k grant for specific sectors in Northern Ireland",
                "text": "Sector specific NI"
            },
            "prerequisites": [
                "1d+5a",
                "1d+5b",
                "1d+5c"
            ],
            "links": [
                {
                    "text": "£25k grant sector support",
                    "url": "https://www.gov.uk/government/publications/support-for-those-affected-by-covid-19/support-for-those-affected-by-covid-19"
                }
            ]
        },
        {
            "number": 15,
            "guidance": {
                "title": "Business rates holiday for specific sectors in England",
                "text": "Rates on holiday? England"
            },
            "prerequisites": [
                "1a+5a",
                "1a+5b",
                "1a+5c",
                "1a+5d"
            ],
            "links": [
                {
                    "text": "Business Rates holiday for sectors",
                    "url": "https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief"
                }
            ]
        },
        {
            "number": 16,
            "guidance": {
                "title": "Business rates holiday for specific sectors in Wales",
                "text": "Rates on holiday? Wales"
            },
            "prerequisites": [
                "1b+5a",
                "1b+5b",
                "1b+5c",
                "1b+5d"
            ],
            "links": [
                {
                    "text": "Business Rates holiday for sectors",
                    "url": "https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief"
                }
            ]
        },
        {
            "number": 17,
            "guidance": {
                "title": "Business rates holiday for specific sectors in Scotland",
                "text": "Rates on holiday? Scotland"
            },
            "prerequisites": [
                "1c+5a",
                "1c+5b",
                "1c+5c",
                "1c+5d"
            ],
            "links": [
                {
                    "text": "Business Rates holiday for sectors",
                    "url": "https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief"
                }
            ]
        },
        {
            "number": 18,
            "guidance": {
                "title": "Business rates holiday for specific sectors in Northern Ireland",
                "text": "Rates on holiday?Northern Ireland"
            },
            "prerequisites": [
                "1d+5a",
                "1d+5b",
                "1d+5c",
                "1d+5d"
            ],
            "links": [
                {
                    "text": "Business Rates holiday for sectors",
                    "url": "https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief"
                }
            ]
        },
        {
            "number": 19,
            "guidance": {
                "title": "Ban on evictions",
                "text": "You can stay home"
            },
            "prerequisites": [
                "6a"
            ],
            "links": [
                {
                    "text": "Ban on evictions",
                    "url": "https://www.gov.uk/government/news/extra-protection-for-businesses-with-ban-on-evictions-for-commercial-tenants-who-miss-rent-payments"
                }
            ]
        }
    ]
}