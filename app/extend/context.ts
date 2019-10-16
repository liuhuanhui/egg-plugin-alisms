interface Context {
  app: {
    alisms: any;
  };
}
export default {
  get alisms (this: Context) {
    return this.app.alisms;
  },
};
