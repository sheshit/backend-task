function isRequired(body, profile_image) {
    let {
        first_name,
        last_name,
        father_name,
        PAN,
        date_of_birth,
        gender,
        email,
        address
    } = body;
    if (typeof first_name !== 'undefined' && typeof last_name !== 'undefined' && typeof father_name !== 'undefined' && typeof PAN !== 'undefined' && typeof date_of_birth !== 'undefined' && typeof gender !== 'undefined' && typeof email !== 'undefined' && typeof address !== 'undefined' && typeof profile_image !== 'undefined') {
        return true;
    }
    else {
        return false;
    }
};

module.exports = isRequired;
