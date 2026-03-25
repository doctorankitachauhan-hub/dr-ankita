function generateInitials(name?: string | null): string {
    if (!name || !name.trim()) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }
    return (
        parts[0][0].toUpperCase() +
        parts[parts.length - 1][0].toUpperCase()
    );
}
