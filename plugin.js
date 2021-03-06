// `typescript` is the `ts` namespace in node_modules/typescript/lib/tsserverlibrary.d.ts
/** @typedef {{ typescript: unknown; }} Modules */

// This is `interface LanguageService` in node_modules/typescript/lib/tsserverlibrary.d.ts
/** @typedef {{ }} Service */

module.exports = function init(/** @type {Modules} */ modules) {
  function create(info) {
    /** @type {Service} */
    const service = info.languageService;

    info.project.projectService.logger.info('Returned service proxy');
    return new Proxy(
      service,

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions
      {
        apply(target, thisArg, argArray) {
          const result = Reflect.apply(target, thisArg, argArray);
          info.project.projectService.logger.info('PROXY: apply ' + target.name + ' ' + JSON.stringify({ argArray, result }));
          return result;
        },
        get(target, prop, receiver) {
          const result = Reflect.get(target, prop, receiver);
          const resultProxy = new Proxy(
            result,
            {
              apply(target, thisArg, argArray) {
                const result = Reflect.apply(target, thisArg, argArray);
                info.project.projectService.logger.info('PROXY: apply ' + target.name + ' ' + JSON.stringify({ argArray, result }));
                return result;
              }
            }
          );

          info.project.projectService.logger.info('PROXY: get ' + JSON.stringify({ prop, resultType: typeof result, result }));
          return resultProxy;
        }
      }
    );
  }

  return { create };
};
