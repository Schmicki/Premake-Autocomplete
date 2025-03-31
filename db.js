const vscode = require('vscode');

class Scope {
    static Ignore = 0;
    static Config = 1;
    static Workspace = 2;
    static Project = 3;
    static Rule = 4;
    static File = 5;
}

function genFunc(label, args) {
    return {
        label: label,
        args: args,
        snippet: `${label} "$\{1|${args.join(",")}|\}"`,
        kind: vscode.CompletionItemKind.Function
    };
}

const functions = [
    {
        label: "C Workspace + Project",
        snippet: [
            "workspace \"${1:MyWorkspace}\"",
            "\tconfigurations { \"Debug\", \"Release\" }",
            "\tplatforms { \"Win32\", \"Win64\" }",
            "",
            "\ttargetdir \"bin/%{cfg.buildcfg}/\"",
            "\tobjdir\"obj/%{cfg.buildcfg}/\"",
            "",
            "\tdefaultplatform \"Win32\"",
            "\tstartproject \"${2:MyProject}\"",
            "",
            "\tfilter \"platforms:*32\"",
            "\t\tarchitecture \"x86\"",
            "",
            "\tfilter \"platforms:*64\"",
            "\t\tarchitecture \"x86_64\"",
            "",
            "project \"${2:MyProject}\"",
            "\tkind \"ConsoleApp\"",
            "\tlanguage \"C\"",
            "\tcdialect \"C99\"",
            "",
            "\tfiles {\"**.c\", \"**.h\"}",
            "",
            "\tfilter \"configurations:Debug\"",
            "\t\tdefines { \"DEBUG\" }",
            "\t\tsymbols \"On\"",
            "\t",
            "\tfilter \"configurations:Release\"",
            "\t\tdefines { \"NDEBUG\" }",
            "\t\toptimize \"On\"",
        ],
        kind: vscode.CompletionItemKind.Snippet
    },
    {
        label: "C++ Workspace + Project",
        snippet: [
            "workspace \"${1:MyWorkspace}\"",
            "\tconfigurations { \"Debug\", \"Release\" }",
            "\tplatforms { \"Win32\", \"Win64\" }",
            "",
            "\ttargetdir \"bin/%{cfg.buildcfg}/\"",
            "\tobjdir\"obj/%{cfg.buildcfg}/\"",
            "",
            "\tdefaultplatform \"Win32\"",
            "\tstartproject \"${2:MyProject}\"",
            "",
            "\tfilter \"platforms:*32\"",
            "\t\tarchitecture \"x86\"",
            "",
            "\tfilter \"platforms:*64\"",
            "\t\tarchitecture \"x86_64\"",
            "",
            "project \"${2:MyProject}\"",
            "\tkind \"ConsoleApp\"",
            "\tlanguage \"C++\"",
            "\tcppdialect \"C++17\"",
            "",
            "\tfiles {\"**.cpp\", \"**.h\", \"**.hpp\"}",
            "",
            "\tfilter \"configurations:Debug\"",
            "\t\tdefines { \"DEBUG\" }",
            "\t\tsymbols \"On\"",
            "\t",
            "\tfilter \"configurations:Release\"",
            "\t\tdefines { \"NDEBUG\" }",
            "\t\toptimize \"On\"",
        ],
        kind: vscode.CompletionItemKind.Snippet
    },
    {
        label: "C Project",
        snippet: [
            "project \"${1:MyProject}\"",
            "\tkind \"${2:ConsoleApp|WindowedApp|SharedLib|StaticLib|Makefile}\"",
            "\tlanguage \"C\"",
            "\tcdialect \"C99\"",
            "",
            "\tfiles {\"**.c\", \"**.h\"}",
            "",
            "\tfilter \"configurations:Debug\"",
            "\t\tdefines { \"DEBUG\" }",
            "\t\tsymbols \"On\"",
            "\t",
            "\tfilter \"configurations:Release\"",
            "\t\tdefines { \"NDEBUG\" }",
            "\t\toptimize \"On\"",
        ],
        kind: vscode.CompletionItemKind.Snippet
    },
    {
        label: "C++ Project",
        snippet: [
            "project \"${1:MyProject}\"",
            "\tkind \"${2:ConsoleApp|WindowedApp|SharedLib|StaticLib|Makefile}\"",
            "\tlanguage \"C++\"",
            "\tcppdialect \"C++17\"",
            "",
            "\tfiles {\"**.cpp\", \"**.h\", \"**.hpp\"}",
            "",
            "\tfilter \"configurations:Debug\"",
            "\t\tdefines { \"DEBUG\" }",
            "\t\tsymbols \"On\"",
            "\t",
            "\tfilter \"configurations:Release\"",
            "\t\tdefines { \"NDEBUG\" }",
            "\t\toptimize \"On\"",
        ],
        kind: vscode.CompletionItemKind.Snippet
    },

    // Old snippets

    genFunc("allmodulespublic", ["On", "Off"]),
    genFunc( "androidapilevel", [
        "21", "22", "23", "24", "25", "26", "27", "28",
        "29", "30", "31", "32", "33", "34", "35", "36"
    ]),
    genFunc("androidapplibname", ["On", "Off"]),
    genFunc("architecture", [
        "universal", "x86", "x86_64", "ARM", "ARM64", "RISCV64",
        "loongarch64", "wasm32", "wasm64", "e2k", "armv5", "armv7",
        "aarch64", "mips", "mips64", "i386", "armd64", "x32", "x64"
    ]),
    {
        label: "assemblydebug",
        snippet: "assemblydebug \"$1\""
    },
    genFunc("atl", [ "Off", "Dynanmic", "Static" ]),
    {
        label: "basedir",
        snippet: "basedir \"${1:dir}\""
    },
    {
        label: "bindirs",
        snippet: "bindirs { \"${1:dir}\" }"
    },
    {
        label: "buildaction",
        args: [
            "ClInclude", "ClCompile", "FxCompile", "None", "ResourceCompile", "CustomBuild", "Midl",
            "Masm", "Image", "Natvis", "AppxManifest", "Copy", "Application", "Compile", "Component",
            "Embed", "Form", "Resource", "UserControl"
        ],
        snippet: [
            "buildaction \"${1|",
            [
                "ClInclude", "ClCompile", "FxCompile", "None", "ResourceCompile", "CustomBuild", "Midl",
                "Masm", "Image", "Natvis", "AppxManifest", "Copy", "Application", "Compile", "Component",
                "Embed", "Form", "Resource", "UserControl"
            ].join(","),
            "|}\""
        ].join("")
    },
    {
        label: "buildaction (C/C++)",
        args: [
            "ClInclude", "ClCompile", "FxCompile", "None", "ResourceCompile", "CustomBuild", "Midl",
            "Masm", "Image", "Natvis", "AppxManifest", "Copy"
        ],
        snippet: [
            "buildaction \"${1|",
            [
                "ClInclude", "ClCompile", "FxCompile", "None", "ResourceCompile", "CustomBuild", "Midl",
                "Masm", "Image", "Natvis", "AppxManifest", "Copy"
            ].join(","),
            "|}\""
        ].join("")
    },
    {
        label: "buildaction (C#)",
        args: [
            "Application", "Compile", "Component", "Copy", "Embed", "Form", "None", "Resource",
            "UserControl"
        ],
        snippet: [
            "buildaction \"${1|",
            [
                "Application", "Compile", "Component", "Copy", "Embed", "Form", "None", "Resource",
                "UserControl"
            ].join(","),
            "|}\""
        ].join("")
    },
    {
        label: "buildcommands",
        snippet: "buildcommands { \"${1:command}\" }"
    },
    {
        label: "buildcustomizations",
        snippet: "buildcustomizations { \"$1\" }"
    },
    {
        label: "builddependencies",
        snippet: "builddependencies { \"$1\" }"
    },
    {
        label: "buildinputs",
        snippet: "buildinputs { \"$1\" }"
    },
    {
        label: "buildlog",
        snippet: "buildlog \"$1\""
    },
    {
        label: "buildmessage",
        snippet: "buildmessage \"${1:msg}\""
    },
    {
        label: "buildoptions",
        snippet: "buildoptions { \"$1\" }"
    },
    {
        label: "buildoutputs",
        snippet: "buildoutputs { \"$1\" }"
    },
    genFunc("buildstlmodules", ["On", "Off"]),
    genFunc("callingconvention", ["Cdecl", "FastCall", "StdCall", "VectorCall"]),
    genFunc("cdialect", ["C89", "C90", "C99", "C11", "C17", "C23", "gnu89", "gnu90", "gnu99",
        "gnu11", "gnu17", "gnu23"]),
    genFunc("characterset", ["Default", "MBCS", "Unicode", "ASCII"]),
    genFunc("clangtidy", ["On", "Off"]),
    {
        label: "cleancommands",
        snippet: "cleancommands { \"${1:command}\" }"
    },
    {
        label: "cleanextensions",
        snippet: "cleanextensions { \"${1:ext}\" }"
    },
    genFunc("clr", ["Off", "On", "Pure", "Safe", "Unsafe", "NetCore"]),
    genFunc("compileas", ["Default", "C", "C++", "Objective-C", "Objective-C++", "Module",
        "ModulePartition", "HeaderUnit"]),
    genFunc("compilebuildoutputs", ["on", "off"]),
    {
        label: "configfile",
        snippet: "configfile \"${1:filepath}\""
    },
    {
        label: "configmap",
        snippet: "configmap {\n\t[\"${1:configA}\"] = \"${2:configB}\"\n}"
    },
    {
        label: "configuration",
        snippet: "configuration { \"${1:config}\" }"
    },
    {
        label: "configurations",
        snippet: "configurations { \"${1:cfg1}\", \"${2:cfg2}\" }"
    },
    {
        label: "conformancemode",
        snippet: "conformancemode \"$1\""
    },
    genFunc("consumewinrtextension", ["Default", "On", "Off"]),
    {
        label: "copylocal",
        snippet: "copylocal { \"$1\" }"
    },
    genFunc("cppdialect", [
        "Default", "C++latest",
        "C++98", "C++11", "C++14", "C++17", "C++20", "C++23",
        "gnu++98", "gnu++11", "gnu++14", "gnu++17", "gnu++20", "gnu++23",
        "C++0x", "C++1y", "C++1z", "C++2a", "C++2b",
        "gnu++0x", "gnu++1y", "gnu++1z", "gnu++2a", "gnu++2b"
    ]),
    genFunc("csversion", [
        "14", "13", "12", "11", "10", "9.0", "8.0", "7.3"
    ]),
    {
        label: "customtoolnamespace",
        snippet: "customtoolnamespace \"$1\""
    },
    {
        label: "debug.prompt",
        snippet: "debug.prompt($1)"
    },
    {
        label: "debugargs",
        snippet: "debugargs { \"$1\" }"
    },
    {
        label: "debugcommand",
        snippet: "debugcommand \"${1:cmd}\""
    },
    {
        label: "debugconnectcommands",
        snippet: "debugconnectcommands { \"${1:cmd}\" }"
    },
    {
        label: "debugdir",
        snippet: "debugdir \"${1:dir}\""
    },
    {
        label: "debugenvs",
        snippet: "debugenvs { \"$1\" }"
    },
    {
        label: "debugextendedprotocol",
        snippet: "debugextendedprotocol(enabled)"
    },
    genFunc("debugformat", [
        "Default", "c7", "Dwarf", "SplitDwarf"
    ]),
    genFunc("debugger", [
        "Default", "GDB", "LLDB", "VisualStudioLocal", "VisualStudioRemote", "VisualStudioWebBrowser",
        "VisualStudioWebService"
    ]),
    genFunc("debuggertype", [
        "Local", "Remote", "WebBrowser", "WebService"
    ]),
    genFunc("debuggertype", [
        "Mixed", "NativeOnly", "ManagedOnly", "NativeWithManagedCore"
    ]),
    {
        label: "debugport",
        snippet: "debugport(${1:port})"
    },
    {
        label: "debugremotehost",
        snippet: "debugremotehost \"${1:hostname}\""
    },
    {
        label: "debugsearchpaths",
        snippet: "debugsearchpaths { \"${1:path}\" }"
    },
    {
        label: "debugstartupcommands",
        snippet: "debugstartupcommands { \"${1:cmd}\" }"
    },
    {
        label: "defaultplatform",
        snippet: "defaultplatform \"${1:platform}\""
    },
    {
        label: "defines",
        snippet: "defines { \"$1\" }"
    },
    {
        label: "dependson",
        snippet: "dependson { \"${1:lib}\" }"
    },
    {
        label: "deploymentoptions",
        snippet: "deploymentoptions { \"$1\" }"
    },
    {
        label: "disablewarnings",
        snippet: "disablewarnings { \"$1\" }"
    },
    {
        label: "display",
        snippet: "display \"$1\""
    },
    {
        label: "documentationfile",
        snippet: "documentationfile($1)"
    },
    genFunc("dotnetframework", [
        "1.0", "1.1", "2.0", "3.0", "3.5", "4.0", "4.5", "4.6"
    ]),
    genFunc("dotnetsdk", [
        "Default", "Web", "Razor", "Worker", "Blazor", "WindowsDesktop", "MSTest"
    ]),
    genFunc("dpiawareness", [
        "Default", "None", "High", "HighPerMonitor"
    ]),
    genFunc("editandcontinue", ["On", "Off"]),
    genFunc("editorintegration", ["On", "Off"]),
    {
        label: "embed",
        snippet: "embed { \"$1\" }"
    },
    {
        label: "embedAndSign",
        snippet: "embedAndSign { \"$1\" }"
    },
    {
        label: "enabledefaultcompileitems",
        snippet: "enabledefaultcompileitems \"$1\""
    },
    genFunc("enablemodules", ["On", "Off"]),
    genFunc("enableunitybuild", ["On", "Off"]),
    {
        label: "enablewarnings",
        snippet: "enablewarnings { \"$1\" }"
    },
    genFunc("endian", ["Default", "Little", "Big"]),
    {
        label: "entrypoint",
        snippet: "entrypoint \"$1\""
    },
    genFunc("exceptionhandling", [
        "Default", "On", "Off", "SEH", "CThrow", "UnwindTables"
    ]),
    {
        label: "external",
        snippet: "external \"$1\""
    },
    genFunc("externalanglebrackets", ["On", "Off"]),
    {
        label: "externalincludedirs",
        snippet: "externalincludedirs { \"$1\" }"
    },
    {
        label: "externalproject",
        snippet: "externalproject \"$1\""
    },
    {
        label: "externalrule",
        snippet: "externalrule \"$1\""
    },
    genFunc("externalwarnings", ["Off", "Default", "Extra", "High", "Everything"]),
    {
        label: "fastuptodate",
        snippet: "fastuptodate \"$1\""
    },
    {
        label: "fatalwarnings",
        snippet: "fatalwarnings { \"$1\" }"
    },
    {
        label: "fileextension",
        snippet: "fileextension \"$1\""
    },
    {
        label: "filename",
        snippet: "filename \"$1\""
    },
    {
        label: "files",
        snippet: "files { \"${1:pattern}\" }"
    },
    {
        label: "filter",
        args: [
            "action:", "architecture:", "configurations:", "files:", "kind:", "language:", "options:",
            "platforms:", "system:", "toolset:"
        ],
        snippet: "filter { \"$1\" }"
    },
    {
        label: "flags",
        args: [
            "ExcludeFromBuild", "FatalCompileWarnings", "FatalLinkWarnings", "LinkTimeOptimization",
            "Maps", "MFC", "MultiProcessorCompile", "No64BitChecks", "NoBufferSecurityCheck",
            "NoCopyLocal", "NoFramePointer", "NoImplicitLink", "NoImportLib", "NoIncrementalLink",
            "NoManifest", "NoMinimalRebuild", "NoPCH", "NoRuntimeChecks", "OmitDefaultLibrary",
            "RelativeLinks", "ShadowedVariables", "UndefinedIdentifiers", "WPF", "DebugEnvsDontMerge",
            "DebugEnvsInherit"
        ],
        snippet: "flags { \"$1\" }"
    },
    genFunc("floatabi", ["soft", "softfp", "hard"]),
    genFunc("floatingpoint", ["Default", "Fast", "Strict"]),
    genFunc("floatingpointexceptions", ["On", "Off"]),
    {
        label: "forceincludes",
        snippet: "forceincludes { \"${1:file}\" }"
    },
    {
        label: "forceusings",
        snippet: "forceusings { \"$1\" }"
    },
    genFunc("fpu", ["Software", "Hardware"]),
    genFunc("framework", ["1.0", "1.1", "2.0", "3.0", "3.5", "4.0"]),
    {
        label: "frameworkdirs",
        snippet: "frameworkdirs { \"$1\" }"
    },
    genFunc("functionlevellinking", ["On", "Off"]),
    {
        label: "gccprefix",
        snippet: "gccprefix \"$1\""
    },
    {
        label: "group",
        snippet: "group \"${1:name}\""
    },
    {
        label: "icon",
        snippet: "icon \"${1:filepath}\""
    },
    {
        label: "ignoredefaultlibraries",
        snippet: "ignoredefaultlibraries { \"$1\" }"
    },
    {
        label: "imageoptions",
        snippet: "imageoptions { \"$1\" }"
    },
    {
        label: "imagepath",
        snippet: "imagepath \"$1\""
    },
    {
        label: "implibdir",
        snippet: "implibdir \"$1\""
    },
    {
        label: "implibextension",
        snippet: "implibextension \"$1\""
    },
    {
        label: "implibname",
        snippet: "implibname \"$1\""
    },
    {
        label: "implibprefix",
        snippet: "implibprefix \"$1\""
    },
    {
        label: "implibsuffix",
        snippet: "implibsuffix \"$1\""
    },
    {
        label: "includedirs",
        snippet: "includedirs { \"$1\" }"
    },
    {
        label: "inclincludedirsafterudedirs",
        snippet: "includedirsafter { \"$1\" }"
    },
    genFunc("inheritdependencies", ["On", "Off"]),
    genFunc("inlinesvisibility", ["Default", "Hidden"]),
    genFunc("inlining", ["Default", "Disabled", "Explicit", "Auto"]),
    genFunc("intrinsics", ["On", "Off"]),
    genFunc("iosfamily", ["iPhone/iPod touch", "iPad", "Universal"]),
    {
        label: "isaextensions",
        args: [
            "MOVBE", "POPCNT", "PCLMUL", "LZCNT", "BMI", "BMI2", "F16C", "AES", "FMA", "FMA4",
            "RDRND"
        ],
        snippet: "isaextensions { \"$1\" }"
    },
    genFunc("justmycode", ["On", "Off"]),
    genFunc("kind", [
        "ConsoleApp", "WindowedApp", "SharedLib", "StaticLib", "Makefile", "Utility", "None",
        "Packaging", "SharedItems"
    ]),
    genFunc("language", ["C", "C++", "C#", "F#"]),
    genFunc("largeaddressaware", ["On", "Off"]),
    {
        label: "libdirs",
        snippet: "libdirs { \"$1\" }"
    },
    genFunc("linkbuildoutputs", ["On", "Off"]),
    genFunc("linker", ["Default", "LLD"]),
    {
        label: "linkerfatalwarnings",
        snippet: "linkerfatalwarnings { \"$1\" }"
    },
    genFunc("linkgroups", ["On", "Off"]),
    {
        label: "linkoptions",
        snippet: "linkoptions { \"$1\" }"
    },
    {
        label: "links",
        snippet: "links { \"${1:lib}\" }"
    },
    genFunc("linktimeoptimization", ["On", "Off", "Default"]),
    {
        label: "locale",
        snippet: "locale \"$1\""
    },
    {
        label: "location",
        snippet: "location \"$1\""
    },
    {
        label: "llvmdir",
        snippet: "llvmdir \"$1\""
    },
    {
        label: "llvmversion",
        snippet: "llvmversion \"$1\""
    },
    {
        label: "makesettings",
        snippet: "makesettings [[\n\t$1\n]]"
    },
    genFunc("mfc", ["Default", "On", "Off", "Static", "Dynamic"]),
    {
        label: "namespace",
        snippet: "namespace \"$1\""
    },
    genFunc("nativewchar", ["Default", "On", "Off"]),
    {
        label: "newaction",
        args: [
            "trigger", "shortname", "description", "execute", "targetos", "valid_kinds",
            "valid_languages", "valid_tools", "toolset", "onStart", "onWorkplace", "onProject",
            "onRule", "onEnd", "onCleanWorkspace", "onCleanProject", "onCleanTarget", "pathVars",
            "aliases", "deprecatedaliases"
        ],
        snippet: "newaction { \"$1\" = $2 }"
    },
    {
        label: "newoption",
        args: [
            "trigger", "description", "value", "allowed", "default", "category"
        ],
        snippet: "newoption { \"$1\" = $2 }"
    },
    {
        label: "nuget",
        snippet: "nuget { \"$1\" }"
    },
    {
        label: "nugetsource",
        snippet: "nugetsource \"$1\""
    },
    {
        label: "objdir",
        snippet: "objdir \"$1\""
    },
    genFunc("omitframepointer", ["Default", "On", "Off"]),
    genFunc("openmp", ["On", "Off"]),
    genFunc("optimize", ["Off", "On", "Debug", "Size", "Speed", "Full"]),
    {
        label: "pchheader",
        snippet: "pchheader \"$1\""
    },
    {
        label: "pchsource",
        snippet: "pchsource \"$1\""
    },
    genFunc("pic", ["On", "Off"]),
    {
        label: "platforms",
        snippet: "platforms { \"${1:platform}\", \"${2:platform}\" }"
    },
    {
        label: "postbuildcommands",
        snippet: "postbuildcommands { \"${1:cmd}\" }"
    },
    {
        label: "postbuildmessage",
        snippet: "postbuildmessage \"${1:msg}\""
    },
    {
        label: "prebuildcommands",
        snippet: "prebuildcommands { \"${1:cmd}\" }"
    },
    {
        label: "prebuildmessage",
        snippet: "prebuildmessage \"${1:msg}\""
    },
    genFunc("preferredtoolarchitecture", ["Default", "x86", "x86_64"]),
    {
        label: "prelinkcommands",
        snippet: "prelinkcommands { \"${1:cmd}\" }"
    },
    {
        label: "prelinkmessage",
        snippet: "prelinkmessage \"${1:msg}\""
    },
    genFunc("profile", ["On", "Off"]),
    {
        label: "project",
        snippet: "project \"${1:name}\""
    },
    {
        label: "propertydefinition",
        snippet: "propertydefinition { $1 = \"$2\" }"
    },
    {
        label: "rebuildcommands",
        snippet: "rebuildcommands { \"${1:cmd}\" }"
    },
    {
        label: "remotedeploydir",
        snippet: "remotedeploydir \"$1\""
    },
    {
        label: "remoteprojectdir",
        snippet: "remoteprojectdir \"$1\""
    },
    {
        label: "remoteprojectrelativedir",
        snippet: "remoteprojectrelativedir \"$1\""
    },
    {
        label: "remoterootdir",
        snippet: "remoterootdir \"$1\""
    },
    genFunc("removeunreferencedcodedata", ["On", "Off"]),
    {
        label: "resdefines",
        snippet: "resdefines { \"$1\" }"
    },
    {
        label: "resincludedirs",
        snippet: "resincludedirs { \"$1\" }"
    },
    {
        label: "resoptions",
        snippet: "resoptions { \"$1\" }"
    },
    genFunc("resourcegenerator", ["internal", "public"]),
    genFunc("rtti", ["Default", "On", "Off"]),
    {
        label: "rule",
        snippet: "rule \"$1\""
    },
    {
        label: "rules",
        snippet: "rules { \"$1\" }"
    },
    genFunc("runcodeanalysis", ["On", "Off"]),
    genFunc("runtime", ["Debug", "Release"]),
    {
        label: "sanitize",
        args: [
            "Address", "Fuzzer", "Thread", "UndefinedBehavior"
        ],
        snippet: "sanitize { \"$1\" }"
    },
    genFunc("scanformoduledependencies", ["On", "Off"]),
    genFunc("shaderassembler", ["NoListing", "AssemblyCode", "AssemblyCodeAndHex"]),
    {
        label: "shaderassembleroutput",
        snippet: "shaderassembleroutput \"$1\""
    },
    {
        label: "shaderdefines",
        snippet: "shaderdefines { \"$1\" }"
    },
    {
        label: "shaderentry",
        snippet: "shaderentry \"$1\""
    },
    {
        label: "shaderheaderfileoutput",
        snippet: "shaderheaderfileoutput \"$1\""
    },
    {
        label: "shaderincludedirs",
        snippet: "shaderincludedirs { \"$1\" }"
    },
    genFunc("shadermodel", [
        "2.0", "3.0", "4.0_level_9_1", "4.0_level_9_3", "4.0", "4.1", "5.0", "5.1", "rootsig_1.0",
        "rootsig_1.1", "6.0", "6.1", "6.2", "6.3", "6.4", "6.5", "6.6"
    ]),
    {
        label: "shaderobjectfileoutput",
        snippet: "shaderobjectfileoutput \"$1\""
    },
    {
        label: "shaderoptions",
        snippet: "shaderoptions { \"$1\" }"
    },
    genFunc("shadertype", [
        "Effect", "Vertex", "Pixel", "Geometry", "Hull", "Domain", "Compute", "Library", "Mesh",
        "Amplification", "Texture", "RootSignature"
    ]),
    {
        label: "shadervariablename",
        snippet: "shadervariablename \"$1\""
    },
    genFunc("sharedlibtype", ["OSXBundle", "OSXFramework", "XCTest"]),
    {
        label: "startproject",
        snippet: "startproject \"$1\""
    },
    genFunc("staticruntime", ["Default", "On", "Off"]),
    genFunc("stl", ["none", "gabi++", "stlport", "gnu", "libc++"]),
    genFunc("strictaliasing", ["Off", "Level1", "Level2", "Level3"]),
    genFunc("stringpooling", ["On", "Off"]),
    genFunc("stringpostructmemberalignoling", ["1", "2", "4", "8", "16"]),
    genFunc("swiftversion", ["4.0", "4.2", "5.0"]),
    genFunc("symbols", ["Default", "Off", "On", "FastLink", "Full"]),
    {
        label: "symbolspath",
        snippet: "symbolspath \"$1\""
    },
    {
        label: "syslibdirs",
        snippet: "syslibdirs { \"$1\" }"
    },
    genFunc("system", [
        "aix", "android", "bsd", "emscripten", "haiku", "ios", "linux", "macosx", "solaris", "uwp",
        "wii", "windows", "xbox360"
    ]),
    genFunc("systemversion", ["min:", "max:"]),
    {
        label: "tags",
        snippet: "tags { \"$1\" }"
    },
    {
        label: "tailcalls",
        snippet: "tailcalls { \"$1\" }"
    },
    {
        label: "targetdir",
        snippet: "targetdir \"${1:dir}\""
    },
    {
        label: "targetextension",
        snippet: "targetextension \"${1:ext}\""
    },
    {
        label: "targetname",
        snippet: "targetname \"${1:name}\""
    },
    {
        label: "targetprefix",
        snippet: "targetprefix \"${1:prefix}\""
    },
    {
        label: "targetsuffix",
        snippet: "targetsuffix \"${1:suffix}\""
    },
    genFunc("thumbmode", ["thumb", "arm", "disabled"]),
    genFunc("toolchainversion", ["4.6", "4.8", "4.9", "3.4", "3.5", "3.6", "3.8", "5.0"]),
    genFunc("toolset", ["clang", "dotnet", "gcc", "msc"]),
    {
        label: "toolsversion",
        snippet: "toolsversion \"$1\""
    },
    {
        label: "undefines",
        snippet: "undefines { \"$1\" }"
    },
    genFunc("usage", ["Custom", "PRIVATE", "INTERFACE", "PUBLIC"]),
    genFunc("unsignedchar", ["Off", "On"]),
    genFunc("usefullpaths", ["Off", "On"]),
    {
        label: "uses",
        snippet: "uses { \"$1\" }"
    },
    genFunc("usestandardpreprocessor", ["Off", "On"]),
    {
        label: "usingdirs",
        snippet: "usingdirs { \"$1\" }"
    },
    {
        label: "uuid",
        snippet: "uuid \"${1:uuid}\""
    },
    genFunc("vectorextensions", [
        "Default", "AVX", "AVX2", "IA32", "SSE", "SSE2", "SSE3", "SSSE3", "SSE4.1", "SSE4.2",
        "NEON", "MXU"
    ]),
    genFunc("visibility", ["Default", "Hidden", "Internal", "Protected"]),
    {
        label: "vpaths",
        snippet: "vpaths {\n\t[\"${1:group}\"] = \"${2:pattern}\"\n}"
    },
    {
        label: "vsprops",
        snippet: "vsprops {\n\t${1:name} = \"${2:value}\"\n}"
    },
    genFunc("warnings", ["Off", "Default", "Extra", "High", "Everything"]),
    {
        label: "workspace",
        snippet: "workspace \"${1:name}\""
    },
    {
        label: "xcodebuildsettings",
        snippet: "xcodebuildsettings {\n\t[\"${1:key}\"] = \"${2:value}\"\n}"
    },
    {
        label: "xcodecodesigningidentity",
        snippet: "xcodecodesigningidentity \"$1\""
    },
    {
        label: "xcodesystemcapabilities",
        snippet: "xcodesystemcapabilities \"$1\""
    },
    genFunc("gitintegration", ["Off", "Always", "OnNewFiles"]),
    {
        label: "_ACTION",
		sortText: "zzz_ACTION",
        snippet: "_ACTION",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_ARGS",
		sortText: "zzz_ARGS",
        snippet: "_ARGS",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_MAIN_SCRIPT_DIR",
		sortText: "zzz_MAIN_SCRIPT_DIR",
        snippet: "_MAIN_SCRIPT_DIR",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_MAIN_SCRIPT",
		sortText: "zzz_MAIN_SCRIPT",
        snippet: "_MAIN_SCRIPT",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_OPTIONS",
		sortText: "zzz_OPTIONS",
        snippet: "_OPTIONS",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_OS",
		sortText: "zzz_OS",
        snippet: "_OS",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_PREMAKE_COMMAND",
		sortText: "zzz_PREMAKE_COMMAND",
        snippet: "_PREMAKE_COMMAND",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_PREMAKE_DIR",
		sortText: "zzz_PREMAKE_DIR",
        snippet: "_PREMAKE_DIR",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_PREMAKE_VERSION",
		sortText: "zzz_PREMAKE_VERSION",
        snippet: "_PREMAKE_VERSION",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_TARGET_ARCH",
		sortText: "zzz_TARGET_ARCH",
        snippet: "_TARGET_ARCH",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_TARGET_OS",
		sortText: "zzz_TARGET_OS",
        snippet: "_TARGET_OS",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "_WORKING_DIR",
		sortText: "zzz_WORKING_DIR",
        snippet: "_WORKING_DIR",
        kind: vscode.CompletionItemKind.Constant
    },
    {
        label: "dofileopt",
        snippet: "dofileopt \"$1\""
    },
    {
        label: "iif",
        snippet: "iif (${1:condition}, ${2:then}, ${3:else})"
    },
    {
        label: "include",
        snippet: "include \"${1:folder or script}\""
    },
    {
        label: "includeexternal",
        snippet: "includeexternal \"${1:script}\""
    },
    {
        label: "printf",
        snippet: "printf ($1)"
    },
    {
        label: "require",
        snippet: "require (\"${1:modname}\", \"${2:versions}\")"
    },
    {
        label: "verbosef",
        snippet: "verbosef ($1)"
    },
];

const args = {};

for (const f of functions) {
    if (f.args)
        args[f.label] = f.args;
}

module.exports = {
    Scope,
    functions,
    args
}