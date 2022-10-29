STRING_TO_DAY = {
    "sunday": 0,
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6,
}


def getDayFromString(day: str):
    return STRING_TO_DAY[day]
