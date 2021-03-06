module.exports = function init(modules) {
  function create(info) {
    const service = info.languageService;
    info.project.projectService.logger.info(
      "Started custom plugin :-)"
    );
    return service;
  }

  return { create };
}
