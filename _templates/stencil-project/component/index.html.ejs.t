---
to: src/index.html
---
<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <title><%=h.inflection.undasherize(library)%></title>
  <link rel="stylesheet" href="/build/<%=library%>.css" type="text/css" />
  <script src="/build/<%=library%>.js"></script>
</head>
<body>

  <<%=library%> />

  <!--
  <<%=library%> socket="example" mode="full">
      <div slot="results">
      <<%=library%>-results socket="example">
        <div slot="empty">
          <<%=library%>-results-placeholder></<%=library%>-results-placeholder>
        </div>
      </<%=library%>-results>
    </div>
  </<%=library%>>
  -->

</body>
</html>
