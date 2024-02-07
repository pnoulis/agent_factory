// cashier = AFM FORM
function tobject(cashier, { backendForm = false } = {}) {
  cashier ||= {};

  const afmCashier = {
    id: cashier.id || null,
    username: cashier.username || null,
    email: cashier.email || null,
    role: cashier.role || null,
  };

  if (!backendForm) return afmCashier;

  return {
    id: afmCashier.id,
    username: afmCashier.username,
    email: afmCashier.email,
    roles: afmCashier.role ? [`ROLE_${afmCashier.role}`.toUpperCase()] : [],
  };
}

export { tobject };
