export const userCreateSchema = {
  userName: { type: 'string', required: true },
  fullName: { type: 'string', required: true },
  email: { type: 'string', required: true, format: 'email' }
};

export const usuarioUpdateSchema = {
  id: { type: 'integer', required: true },
  userName: { type: 'string', required: true },
  fullName: { type: 'string', required: true },
  email: { type: 'string', required: true, format: 'email' }
};

export const usuarioResponseSchema = {
  id: { type: 'integer', required: true },
  userName: { type: 'string', required: true },
  fullName: { type: 'string', required: true },
  email: { type: 'string', required: true, format: 'email' }
};