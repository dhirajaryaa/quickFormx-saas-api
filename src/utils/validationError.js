export default function ValidationError(error) {
    const errorDetails = error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message
    }))
    return `Validation failed: ${errorDetails
        .map((e) => `${e.field} - ${e.message}`)
        .join(', ')}`
}
