<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MovieReviewSite._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="Search Bar">
        <br />
        <input id="TextSearchBar" type="text" />
        <asp:Button ID="ButtonSearch" runat="server" Text="Search" />
    </div>

    <div class="movies">
        
        <div class="Related Results">

            <asp:Label ID="LabelResults" runat="server" Text="Related Results"></asp:Label>
            <asp:ListBox ID="ListBoxRelated" runat="server">


            </asp:ListBox>
        </div>
    
        <div class="Search Results">

            <asp:Label ID="LabelRelated" runat="server" Text="Search Results"></asp:Label>
            <asp:ListBox ID="ListBoxResults" runat="server">


            </asp:ListBox>
        </div>
    </div>

</asp:Content>
