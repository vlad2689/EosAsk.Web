#pragma checksum "C:\Users\User\RiderProjects\Identity\Identity\Views\Questions\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d8dc143fd237280a246e7918e9774dd3a06566f9"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Questions_Index), @"mvc.1.0.view", @"/Views/Questions/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Questions/Index.cshtml", typeof(AspNetCore.Views_Questions_Index))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\User\RiderProjects\Identity\Identity\Views\_ViewImports.cshtml"
using Identity;

#line default
#line hidden
#line 2 "C:\Users\User\RiderProjects\Identity\Identity\Views\_ViewImports.cshtml"
using Identity.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d8dc143fd237280a246e7918e9774dd3a06566f9", @"/Views/Questions/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6028f7b1dce99287641c3b05c72618329a55e074", @"/Views/_ViewImports.cshtml")]
    public class Views_Questions_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<QuestionsIndexViewModel>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(32, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 3 "C:\Users\User\RiderProjects\Identity\Identity\Views\Questions\Index.cshtml"
  
    ViewBag.Title = "title";
    Layout = "_Layout";

#line default
#line hidden
            BeginContext(96, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 8 "C:\Users\User\RiderProjects\Identity\Identity\Views\Questions\Index.cshtml"
 if (!Model.Questions.Any())
{

#line default
#line hidden
            BeginContext(131, 43, true);
            WriteLiteral("    <h1>\r\n        No questions\r\n    </h1>\r\n");
            EndContext();
#line 13 "C:\Users\User\RiderProjects\Identity\Identity\Views\Questions\Index.cshtml"
}

#line default
#line hidden
            BeginContext(177, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 15 "C:\Users\User\RiderProjects\Identity\Identity\Views\Questions\Index.cshtml"
 foreach(var question in Model.Questions)
{

#line default
#line hidden
            BeginContext(225, 19, true);
            WriteLiteral("    <div>\r\n        ");
            EndContext();
            BeginContext(245, 13, false);
#line 18 "C:\Users\User\RiderProjects\Identity\Identity\Views\Questions\Index.cshtml"
   Write(question.Text);

#line default
#line hidden
            EndContext();
            BeginContext(258, 14, true);
            WriteLiteral("\r\n    </div>\r\n");
            EndContext();
#line 20 "C:\Users\User\RiderProjects\Identity\Identity\Views\Questions\Index.cshtml"
}

#line default
#line hidden
            BeginContext(275, 2, true);
            WriteLiteral("\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<QuestionsIndexViewModel> Html { get; private set; }
    }
}
#pragma warning restore 1591
