function tobject(cashier, { backendForm = false } = {}) {
  cashier ||= {};
  return backendForm
    ? {
        id: cashier.id || null,
        username: cashier.username || null,
        email: cashier.email || null,
        roles: cashier.role ? [`ROLE_${cashier.role}`.toUpperCase()] : [],
      }
    : {
        id: cashier.id || null,
        username: cashier.username || null,
        email: cashier.email || null,
        role: cashier.role || null,
      };
}

export { tobject };
