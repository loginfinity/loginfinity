

Public Class Form1
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' Load the TinyMCE HTML editor
        Dim htmlFilePath As String = System.IO.Path.Combine(Application.StartupPath, "tinymce\tinymce.htm")
        WebBrowser1.Navigate(htmlFilePath)
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' Get the HTML content from the TinyMCE editor
        Dim htmlContent As String = WebBrowser1.Document.InvokeScript("eval", New String() {"tinymce.get('editorcontent').getContent();"})

        ' Display the HTML content (you can save it or use it as needed)
        MessageBox.Show(htmlContent)
    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        Dim form2 As New WinFormHtmlEditor.MainForm
        'set start position to manual
        form2.StartPosition = FormStartPosition.Manual
        ''set form2 location the same as current form
        form2.DesktopLocation = Me.DesktopLocation
        form2.Show()

    End Sub
End Class