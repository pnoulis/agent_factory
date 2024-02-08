function tobject(cashier, options) {
  cashier ||= {};
  options ||= {};

  const _options = {
    backendForm: options.backendForm || false,
  };
  trace(_options, "cashier.tobject() _options");

  const afmCashier = {
    id: cashier.id || null,
    username: cashier.username || null,
    email: cashier.email || null,
    role: cashier.role || null,
  };

  if (!_options.backendForm) return afmCashier;

  return {
    id: afmCashier.id,
    username: afmCashier.username,
    email: afmCashier.email,
    roles: afmCashier.role ? [`ROLE_${afmCashier.role}`.toUpperCase()] : [],
  };
}

export { tobject };
