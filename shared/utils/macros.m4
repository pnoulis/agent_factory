divert(-1)dnl
define(`ifempty', `ifelse(`$1', `', `$2', `$1')')dnl
define(`ifndef', `ifdef(`$1', `ifempty($1, $2)', `$2')')dnl
define(`/* ifelse ')
changecom(`//*', `*//')dnl
changequote([,])dnl
changequote([`],[`])dnl
divert``dnl
