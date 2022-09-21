
export function getRoleString (role) {

    switch (role) {
        case 1:
            return "Developer"
        case 2:
            return "Manager"
        case 3:
            return "Admin"
        default:
            return " "
    }

}

export function getTypeString (type) {

    switch (type) {
        case 1:
            return "Bug"
        case 2:
            return "Issue"
        case 3:
            return "Feature"
        default:
            return " "
    }

}

export function getPriorityString (priority) {

    switch (priority) {
        case 1:
            return "Very High"
        case 2:
            return "High"
        case 3:
            return "Medium"
        case 4:
            return "Low"
        default:
            return " "
    }

}

export default {
    getRoleString,
    getTypeString,
    getPriorityString
}