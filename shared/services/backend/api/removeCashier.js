function removeCashier(payload) {
  return this.publish("/admin/delete", payload);
}

export { removeCashier };
