function checkEmails() {
  var webhookUrl = "URL_WEBHOOK_DISCORD"; // !!!!!!!!!!!!!!
  var query = 'from:alert@distill.io is:unread'; // Configured for Distill Web Monitor
  var threads = GmailApp.search(query, 0, 5);
  
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      if (!message.isUnread()) {
        continue; // Ignore read messages
      }
      
      var subject = message.getSubject();
      var body = message.getPlainBody();
      // Divide the body into lines
      var lines = body.split('\n');

      // Check that there are at least two lines
      if (lines.length >= 2) {
        var secondLine = lines[1];
        
        // Find the position of the string '<You>can unsubscribe'
        var marker = '<You>can unsubscribe';
        var index = secondLine.indexOf(marker);
        
        // Extract text before marker
        var desiredText;
        if (index !== -1) {
          desiredText = secondLine.substring(0, index);
        } else {
          // If marker not found, use entire line
          desiredText = secondLine;
        }
      } else {
        // If there is no second line, define desiredText as empty or a default message
        var desiredText = '';
      }

       // Create payload for Discord
      var payload = {
        "content": "# " + subject + "\n <@ID_DISCORD>\n" + desiredText // !!!!!!!!!!!!!!
      };
      
      var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
      };
      
      // Send message to Discord
      UrlFetchApp.fetch(webhookUrl, options);
      
      // Mark message as read
      message.markRead();
    }
  }
}
