type TokenPayload = {
    id: string;
    email: string;
};

function getTokenPayload(): TokenPayload | null {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        return JSON.parse(atob(token.split(".")[1])) as TokenPayload;
    } catch {
        return null;
    }
}

export function getUserId() {
    return getTokenPayload()?.id ?? null;
}

export function getUserEmail() {
    return getTokenPayload()?.email ?? null;
}

export function getDisplayName() {
    const email = getUserEmail();
    if (!email) {
        return "User";
    }

    return email.split("@")[0];
}

export function getUserInitials() {
    const name = getDisplayName();
    return name.slice(0, 2).toUpperCase();
}