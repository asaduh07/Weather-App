
const getWindDirection=(deg)=>{
    switch (true) {
        case (deg >= 337.5 || deg < 22.5):
            return 'N'; // North
        case (deg >= 22.5 && deg < 67.5):
            return 'NE'; // Northeast
        case (deg >= 67.5 && deg < 112.5):
            return 'E'; // East
        case (deg >= 112.5 && deg < 157.5):
            return 'SE'; // Southeast
        case (deg >= 157.5 && deg < 202.5):
            return 'S'; // South
        case (deg >= 202.5 && deg < 247.5):
            return 'SW'; // Southwest
        case (deg >= 247.5 && deg < 292.5):
            return 'W'; // West
        case (deg >= 292.5 && deg < 337.5):
            return 'NW'; // Northwest
        default:
            return 'N'; // Default to North if no conditions match
    }
}

export default getWindDirection;