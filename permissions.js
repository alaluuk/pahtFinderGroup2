const Roles = {
    "admin": ["*"],
    "customer": [
        "user_query_self",
        "user_update_self",
        "user_update_role_customer",
        "user_delete_self",
        "structures_query",
        "structure_template_query",
        "structure_type_query",
        "structure_materials_query",
        "house_create",
        "house_update_owner_self",
        "house_delete_owner_self",
        "house_structure_create",
        "house_structure_create_owner_self",
        "house_structure_update",
        "house_structure_update_owner_self",
        "house_structure_delete",
        "house_structure_delete_owner_self"
    ]
}

const getPermissions = function(role) {
    if(!Roles.hasOwnProperty(role)) return [];
    return Roles[role];
}

const checkPermission = function(role, permission) {
    let escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    
    let rolePermissions = getPermissions(role);
    for (let i = 0; i < rolePermissions.length; i++) {
        let permissionRegex = new RegExp("^" + rolePermissions[i].split("*").map(escapeRegex).join(".*") + "$");
        if(permissionRegex.test(permission)) return true;
    }

    return false;
}

exports.Roles = Roles;
exports.getPermissions = getPermissions;
exports.checkPermission = checkPermission;
