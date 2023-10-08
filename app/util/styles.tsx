
export function cls(component: string, qualifier?: string): string {
    return [
        'es-',
        component,
        qualifier ? `__${qualifier}` : ''
    ].join('')
}
