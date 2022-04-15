/**
 * Return string param from FormData object
 */
export function getFromFormData(
  formData: FormData,
  param: string,
  fallbackValue: string
): string {
  return formData.get(param)?.toString() || fallbackValue;
}
