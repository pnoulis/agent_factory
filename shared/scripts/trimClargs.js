/*
  This script addresses the issue:

  The scripts contained at agent_factory/shared/scripts are designed to be imported
  as modules and run through the command line. To achieve such flexibility the
  scripts use the length of the command line arguments

  (process.args.length)

  to recognize their runtime.

  The issue with such a design is the case where;

  A script has been imported as a module from another script which also uses
  command line arguments.

  A solution is to trim the command line arguments after they have been parsed
  by the module they were intended and before *importing* the other scripts.

 */

function trimClargs() {
  process.argv = [];
}

export { trimClargs };
