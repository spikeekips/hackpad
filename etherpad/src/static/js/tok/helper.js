
define(function(require, exports, module) {
  var Tokenizer = require("./tokenizer").Tokenizer;

  var Mode = function(name, desc, clazz, extensions) {
    this.name = name;
    this.desc = desc;
    this.clazz = clazz;
    this.rules = new clazz();
    this.rules.name = name;
    this.extRe = new RegExp("^.*\\.(" + extensions.join("|") + ")$", "g");
  };
  Mode.prototype.supportsFile = function(filename) {
    return filename.match(this.extRe);
  };

  var modes = [
    new Mode("abap", "Abap", require("./rules/abap_highlight_rules").AbapHighlightRules, ["abap"]),
    new Mode("abc", "ABC", require("./rules/abc_highlight_rules").ABCHighlightRules, ["abc"]),
    new Mode("actionscript", "ActionScript", require("./rules/actionscript_highlight_rules").ActionScriptHighlightRules, ["actionscript"]),
    new Mode("ada", "Ada", require("./rules/ada_highlight_rules").AdaHighlightRules, ["ada"]),
    //new Mode("apacheconf", "ApacheConf", require("./rules/apache_conf_highlight_rules").ApacheConfHighlightRules, ["apacheconf"]),
    new Mode("applescript", "AppleScript", require("./rules/applescript_highlight_rules").AppleScriptHighlightRules, ["applescript"]),
    new Mode("asciidoc", "Asciidoc", require("./rules/asciidoc_highlight_rules").AsciidocHighlightRules, ["asciidoc"]),
    new Mode("assemblyx86", "AssemblyX86", require("./rules/assembly_x86_highlight_rules").AssemblyX86HighlightRules, ["assemblyx86"]),
    new Mode("autohotkey", "AutoHotKey", require("./rules/autohotkey_highlight_rules").AutoHotKeyHighlightRules, ["autohotkey"]),
    new Mode("batchfile", "BatchFile", require("./rules/batchfile_highlight_rules").BatchFileHighlightRules, ["batchfile"]),
    new Mode("c9search", "C9Search", require("./rules/c9search_highlight_rules").C9SearchHighlightRules, ["c9search"]),
    new Mode("c_cpp", "C/C++", require("./rules/c_cpp_highlight_rules").c_cppHighlightRules, ["c", "cpp", "cxx", "h", "hpp"]),
    new Mode("cirru", "Cirru", require("./rules/cirru_highlight_rules").CirruHighlightRules, ["cirru"]),
    new Mode("clojure", "Clojure", require("./rules/clojure_highlight_rules").ClojureHighlightRules, ["clj"]),
    new Mode("cobol", "Cobol", require("./rules/cobol_highlight_rules").CobolHighlightRules, ["cobol"]),
    new Mode("coffee", "CoffeeScript", require("./rules/coffee_highlight_rules").CoffeeHighlightRules, ["coffee"]),
    new Mode("coldfusion", "ColdFusion", require("./rules/coldfusion_highlight_rules").ColdfusionHighlightRules, ["cfm"]),
    new Mode("csharp", "C#", require("./rules/csharp_highlight_rules").CSharpHighlightRules, ["cs"]),
    new Mode("css", "CSS", require("./rules/css_highlight_rules").CssHighlightRules, ["css"]),
    new Mode("curly", "Curly", require("./rules/curly_highlight_rules").CurlyHighlightRules, ["curly"]),
    new Mode("d", "D", require("./rules/d_highlight_rules").DHighlightRules, ["d"]),
    new Mode("dart", "Dart", require("./rules/dart_highlight_rules").DartHighlightRules, ["dart"]),
    new Mode("diff", "Diff", require("./rules/diff_highlight_rules").DiffHighlightRules, ["diff", "patch"]),
    new Mode("doccomment", "DocComment", require("./rules/doc_comment_highlight_rules").DocCommentHighlightRules, ["doccomment"]),
    new Mode("dockerfile", "Dockerfile", require("./rules/dockerfile_highlight_rules").DockerfileHighlightRules, ["dockerfile"]),
    new Mode("dot", "Dot", require("./rules/dot_highlight_rules").DotHighlightRules, ["dot"]),
    new Mode("eiffel", "Eiffel", require("./rules/eiffel_highlight_rules").EiffelHighlightRules, ["eiffel"]),
    new Mode("elixir", "Elixir", require("./rules/elixir_highlight_rules").ElixirHighlightRules, ["elixir"]),
    new Mode("elm", "Elm", require("./rules/elm_highlight_rules").ElmHighlightRules, ["elm"]),
    new Mode("erlang", "Erlang", require("./rules/erlang_highlight_rules").ErlangHighlightRules, ["erl"]),
    new Mode("forth", "Forth", require("./rules/forth_highlight_rules").ForthHighlightRules, ["forth"]),
    new Mode("ftl", "Ftl", require("./rules/ftl_highlight_rules").FtlHighlightRules, ["ftl"]),
    new Mode("gcode", "Gcode", require("./rules/gcode_highlight_rules").GcodeHighlightRules, ["gcode"]),
    new Mode("gherkin", "Gherkin", require("./rules/gherkin_highlight_rules").GherkinHighlightRules, ["gherkin"]),
    new Mode("gitignore", "Gitignore", require("./rules/gitignore_highlight_rules").GitignoreHighlightRules, ["gitignore"]),
    new Mode("glsl", "glsl", require("./rules/glsl_highlight_rules").glslHighlightRules, ["glsl"]),
    new Mode("golang", "Golang", require("./rules/golang_highlight_rules").GolangHighlightRules, ["go"]),
    new Mode("groovy", "Groovy", require("./rules/groovy_highlight_rules").GroovyHighlightRules, ["groovy"]),
    new Mode("haml", "Haml", require("./rules/haml_highlight_rules").HamlHighlightRules, ["haml"]),
    new Mode("handlebars", "Handlebars", require("./rules/handlebars_highlight_rules").HandlebarsHighlightRules, ["handlebars"]),
    new Mode("haskell", "Haskell", require("./rules/haskell_highlight_rules").HaskellHighlightRules, ["haskell"]),
    new Mode("haxe", "haXe", require("./rules/haxe_highlight_rules").HaxeHighlightRules, ["hx"]),
    new Mode("html", "HTML", require("./rules/html_highlight_rules").HtmlHighlightRules, ["html", "htm"]),
    new Mode("htmlelixir", "HtmlElixir", require("./rules/html_elixir_highlight_rules").HtmlElixirHighlightRules, ["htmlelixir"]),
    new Mode("htmlruby", "HtmlRuby", require("./rules/html_ruby_highlight_rules").HtmlRubyHighlightRules, ["htmlruby"]),
    new Mode("ini", "Ini", require("./rules/ini_highlight_rules").IniHighlightRules, ["ini"]),
    new Mode("io", "Io", require("./rules/io_highlight_rules").IoHighlightRules, ["io"]),
    new Mode("jack", "Jack", require("./rules/jack_highlight_rules").JackHighlightRules, ["jack"]),
    new Mode("jade", "Jade", require("./rules/jade_highlight_rules").JadeHighlightRules, ["jade"]),
    new Mode("java", "Java", require("./rules/java_highlight_rules").JavaHighlightRules, ["java"]),
    new Mode("javascript", "JavaScript", require("./rules/javascript_highlight_rules").JavaScriptHighlightRules, ["js"]),
    new Mode("json", "JSON", require("./rules/json_highlight_rules").JsonHighlightRules, ["json"]),
    new Mode("jsp", "Jsp", require("./rules/jsp_highlight_rules").JspHighlightRules, ["jsp"]),
    new Mode("jsregex", "JsRegex", require("./rules/js_regex_highlight_rules").JsRegexHighlightRules, ["jsregex"]),
    new Mode("jsx", "Jsx", require("./rules/jsx_highlight_rules").JsxHighlightRules, ["jsx"]),
    new Mode("julia", "Julia", require("./rules/julia_highlight_rules").JuliaHighlightRules, ["julia"]),
    new Mode("latex", "LaTeX", require("./rules/latex_highlight_rules").LatexHighlightRules, ["tex"]),
    new Mode("lean", "lean", require("./rules/lean_highlight_rules").leanHighlightRules, ["lean"]),
    new Mode("less", "Less", require("./rules/less_highlight_rules").LessHighlightRules, ["less"]),
    new Mode("liquid", "Liquid", require("./rules/liquid_highlight_rules").LiquidHighlightRules, ["liquid"]),
    new Mode("lisp", "Lisp", require("./rules/lisp_highlight_rules").LispHighlightRules, ["lisp"]),
    new Mode("logiql", "LogiQL", require("./rules/logiql_highlight_rules").LogiQLHighlightRules, ["logiql"]),
    new Mode("lsl", "LSL", require("./rules/lsl_highlight_rules").LSLHighlightRules, ["lsl"]),
    new Mode("lua", "Lua", require("./rules/lua_highlight_rules").LuaHighlightRules, ["lua"]),
    new Mode("luapage", "LuaPage", require("./rules/luapage_highlight_rules").LuaPageHighlightRules, ["luapage"]),
    new Mode("lucene", "Lucene", require("./rules/lucene_highlight_rules").LuceneHighlightRules, ["lucene"]),
    new Mode("makefile", "Makefile", require("./rules/makefile_highlight_rules").MakefileHighlightRules, ["makefile"]),
    new Mode("markdown", "Markdown", require("./rules/markdown_highlight_rules").MarkdownHighlightRules, ["md", "markdown"]),
    new Mode("mask", "Mask", require("./rules/mask_highlight_rules").MaskHighlightRules, ["mask"]),
    new Mode("matlab", "Matlab", require("./rules/matlab_highlight_rules").MatlabHighlightRules, ["matlab"]),
    new Mode("maze", "Maze", require("./rules/maze_highlight_rules").MazeHighlightRules, ["maze"]),
    new Mode("mel", "MEL", require("./rules/mel_highlight_rules").MELHighlightRules, ["mel"]),
    new Mode("mysql", "Mysql", require("./rules/mysql_highlight_rules").MysqlHighlightRules, ["mysql"]),
    new Mode("nix", "Nix", require("./rules/nix_highlight_rules").NixHighlightRules, ["nix"]),
    new Mode("objectivec", "ObjectiveC", require("./rules/objectivec_highlight_rules").ObjectiveCHighlightRules, ["objectivec"]),
    new Mode("ocaml", "OCaml", require("./rules/ocaml_highlight_rules").OcamlHighlightRules, ["ml", "mli"]),
    new Mode("pascal", "Pascal", require("./rules/pascal_highlight_rules").PascalHighlightRules, ["pascal"]),
    new Mode("perl", "Perl", require("./rules/perl_highlight_rules").PerlHighlightRules, ["pl", "pm"]),
    new Mode("pgsql", "pgSQL",require("./rules/pgsql_highlight_rules").PgsqlHighlightRules, ["pgsql", "sql"]),
    new Mode("php", "PHP",require("./rules/php_highlight_rules").PhpHighlightRules, ["php"]),
    new Mode("phplang", "PhpLang", require("./rules/php_highlight_rules").PhpLangHighlightRules, ["phplang"]),
    new Mode("powershell", "Powershell", require("./rules/powershell_highlight_rules").PowershellHighlightRules, ["ps1"]),
    new Mode("praat", "Praat", require("./rules/praat_highlight_rules").PraatHighlightRules, ["praat"]),
    new Mode("prolog", "Prolog", require("./rules/prolog_highlight_rules").PrologHighlightRules, ["prolog"]),
    new Mode("properties", "Properties", require("./rules/properties_highlight_rules").PropertiesHighlightRules, ["properties"]),
    new Mode("protobuf", "Protobuf", require("./rules/protobuf_highlight_rules").ProtobufHighlightRules, ["protobuf"]),
    new Mode("python", "Python", require("./rules/python_highlight_rules").PythonHighlightRules, ["py"]),
    new Mode("r", "R", require("./rules/r_highlight_rules").RHighlightRules, ["r"]),
    new Mode("rdoc", "RDoc", require("./rules/rdoc_highlight_rules").RDocHighlightRules, ["rdoc"]),
    new Mode("rhtml", "RHtml", require("./rules/rhtml_highlight_rules").RHtmlHighlightRules, ["rhtml"]),
    new Mode("ruby", "Ruby", require("./rules/ruby_highlight_rules").RubyHighlightRules, ["rb"]),
    new Mode("rust", "Rust", require("./rules/rust_highlight_rules").RustHighlightRules, ["rust"]),
    new Mode("sass", "Sass", require("./rules/sass_highlight_rules").SassHighlightRules, ["sass"]),
    new Mode("scad", "scad", require("./rules/scad_highlight_rules").scadHighlightRules, ["scad"]),
    new Mode("scala", "Scala", require("./rules/scala_highlight_rules").ScalaHighlightRules, ["scala"]),
    new Mode("scheme", "Scheme", require("./rules/scheme_highlight_rules").SchemeHighlightRules, ["scheme"]),
    new Mode("scss", "SCSS", require("./rules/scss_highlight_rules").ScssHighlightRules, ["scss"]),
    new Mode("sh", "Shell", require("./rules/sh_highlight_rules").ShHighlightRules, ["sh"]),
    new Mode("sjs", "SJS", require("./rules/sjs_highlight_rules").SJSHighlightRules, ["sjs"]),
    new Mode("smarty", "Smarty", require("./rules/smarty_highlight_rules").SmartyHighlightRules, ["smarty"]),
    new Mode("soytemplate", "SoyTemplate", require("./rules/soy_template_highlight_rules").SoyTemplateHighlightRules, ["soytemplate"]),
    new Mode("space", "Space", require("./rules/space_highlight_rules").SpaceHighlightRules, ["space"]),
    new Mode("sql", "SQL", require("./rules/mysql_highlight_rules").MysqlHighlightRules, ["sql"]),
    //new Mode("sql", "SQL", require("./rules/sql_highlight_rules").SqlHighlightRules, ["sql"]),
    //new Mode("sqlserver", "Sql", require("./rules/sqlserver_highlight_rules").SqlHighlightRules, []),
    new Mode("stylus", "Stylus", require("./rules/stylus_highlight_rules").StylusHighlightRules, ["stylus"]),
    new Mode("svg", "SVG", require("./rules/SVG_highlight_rules").SvgHighlightRules, ["svg"]),
    new Mode("tcl", "Tcl", require("./rules/tcl_highlight_rules").TclHighlightRules, ["tcl"]),
    new Mode("tex", "Tex", require("./rules/tex_highlight_rules").TexHighlightRules, ["tex"]),
    new Mode("text", "Text", require("./rules/text_highlight_rules").TextHighlightRules, ["txt"]),
    new Mode("textile", "Textile", require("./rules/textile_highlight_rules").TextileHighlightRules, ["textile"]),
    new Mode("toml", "Toml", require("./rules/toml_highlight_rules").TomlHighlightRules, ["toml"]),
    new Mode("twig", "Twig", require("./rules/twig_highlight_rules").TwigHighlightRules, ["twig"]),
    new Mode("typescript", "TypeScript", require("./rules/typescript_highlight_rules").TypeScriptHighlightRules, ["typescript"]),
    new Mode("vala", "Vala", require("./rules/vala_highlight_rules").ValaHighlightRules, ["vala"]),
    new Mode("vbscript", "VBScript", require("./rules/vbscript_highlight_rules").VBScriptHighlightRules, ["vbscript"]),
    new Mode("velocity", "Velocity", require("./rules/velocity_highlight_rules").VelocityHighlightRules, ["velocity"]),
    new Mode("verilog", "Verilog", require("./rules/verilog_highlight_rules").VerilogHighlightRules, ["verilog"]),
    new Mode("vhdl", "VHDL", require("./rules/vhdl_highlight_rules").VHDLHighlightRules, ["vhdl"]),
    new Mode("xml", "XML", require("./rules/xml_highlight_rules").XmlHighlightRules, ["xml"]),
    new Mode("yaml", "Yaml", require("./rules/yaml_highlight_rules").YamlHighlightRules, ["yaml"])
  ];

  return function(filename) {
    var mode = modes[0]; // text fallback
    for (var i = 0; i < modes.length; i++) {
      if (modes[i].supportsFile(filename)) {
        mode = modes[i];
        break;
      }
    }
    return new Tokenizer(mode.rules.getRules());
  };

});
