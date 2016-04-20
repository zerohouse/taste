angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/directives/collections/collections.html',
    "<div ng-if=\"contents.length>0\" layout=\"row\" layout-align=\"center center\">\n" +
    "    <div class=\"arrow left\" ng-click=\"left()\" ng-hide=\"offset===0\">\n" +
    "        <md-icon>\n" +
    "            <i>chevron_left</i>\n" +
    "        </md-icon>\n" +
    "    </div>\n" +
    "    <content-summary content=\"content\" ng-repeat=\"content in contents | orderBy : '-updateAt' | limitTo : 5 : offset\">\n" +
    "    </content-summary>\n" +
    "    <div class=\"arrow right\" ng-click=\"right()\" ng-show=\"contents.length > 5 && offset < contents.length-5\">\n" +
    "        <md-icon>\n" +
    "            <i>chevron_right</i>\n" +
    "        </md-icon>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/directives/content-summary/content-summary.html',
    "<div layout=\"column\" ng-click=\"content.openCommentDialog()\">\n" +
    "    <img ng-if=\"content.type === 'MOVIE' || content.type === 'BOOK'\" alt=\"{{content.title}}\" class=\"md-avatar\"\n" +
    "         ng-src=\"{{ content.image || '/resources/icons/movie.png' }}\"/>\n" +
    "    <img alt=\"{{content.title}}\" class=\"md-avatar\" ng-if=\"content.type==='ARTIST'\" src=\"/resources/icons/artist.jpg\"/>\n" +
    "    <img alt=\"{{content.title}}\" class=\"md-avatar\" ng-if=\"content.type==='SONG'\" src=\"/resources/icons/song.png\"/>\n" +
    "    <img alt=\"{{content.title}}\" class=\"md-avatar\" ng-if=\"content.type==='ALBUM'\" src=\"/resources/icons/album.jpg\"/>\n" +
    "    <div>\n" +
    "        {{content.title}}\n" +
    "    </div>\n" +
    "    <div ng-click=\"content.removeFromCollection($event);\">\n" +
    "        <small class=\"grey\">삭제</small>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/directives/content/content.html',
    "<div class=\"wrapper\">\n" +
    "    <div class=\"filter\">\n" +
    "        <div class=\"plus\" ng-click=\"content.addAndDetail('.wrapper')\">\n" +
    "            <div ng-if=\"!user.contents.findById(content.id)\">\n" +
    "                <md-icon><i>add</i></md-icon>\n" +
    "                <br>\n" +
    "                컬렉션에 추가하기\n" +
    "            </div>\n" +
    "            <div layout-padding ng-if=\"user.contents.findById(content.id)\">\n" +
    "                <span ng-bind-html=\"content.comment.newLine()||'생각을 남겨주세요.'\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"type\" ng-if=\"!content.image\">{{content.type}}</div>\n" +
    "    <img ng-on-error=\"content.image=false\" ng-if=\"content.image\" class=\"grid-img\" ng-src=\"{{content.image}}\">\n" +
    "    <md-icon class=\"added\" ng-if=\"!collection && user.contents.findById(content.id)\"\n" +
    "             ng-click=\"content.removeFromCollection($event);\">\n" +
    "        <i class=\"check\">check</i>\n" +
    "        <i class=\"minus\">remove</i>\n" +
    "    </md-icon>\n" +
    "</div>\n" +
    "<div class=\"title\">\n" +
    "    <div>{{content.title}}</div>\n" +
    "    <div class=\"pubDate\">{{content.pubDate}}</div>\n" +
    "</div>\n" +
    "<div class=\"description\">\n" +
    "    <div>{{content.subtitle}}</div>\n" +
    "    <div ng-bind-html=\"content.detail\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/directives/usercard/user-card.html',
    "<div class=\"header\">\n" +
    "    <div class=\"profile\" ng-style=\"{'background-image':'url('+getPhoto(user)+')'}\">\n" +
    "    </div>\n" +
    "    <div class=\"info\">\n" +
    "        <div>{{user.name}}</div>\n" +
    "        <small>{{user.age}}, {{user.gender}}, {{user.district}}, {{user.introduce}}</small>\n" +
    "        {{}}\n" +
    "        <div ng-click=\"inviteChat()\" ng-if=\"!findChat(user)\">대화 신청</div>\n" +
    "        <div ui-sref=\"chat({id:findChat(user).id})\" ng-if=\"findChat(user)\">대화창 가기</div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"body\" layout=\"column\">\n" +
    "    <md-list flex class=\"overlay\">\n" +
    "        <md-list-item class=\"md-3-line\" ng-click=\"null\" ng-repeat=\"content in contents | limitTo : 3\">\n" +
    "            <img ng-if=\"content.type === 'MOVIE' || content.type === 'BOOK'\" alt=\"{{content.title}}\" class=\"md-avatar\"\n" +
    "                 ng-src=\"{{ content.image || '/resources/icons/movie.png' }}\"/>\n" +
    "            <img alt=\"{{content.title}}\" class=\"md-avatar\" ng-if=\"content.type==='ARTIST'\"\n" +
    "                 src=\"/resources/icons/artist.jpg\"/>\n" +
    "            <img alt=\"{{content.title}}\" class=\"md-avatar\" ng-if=\"content.type==='SONG'\"\n" +
    "                 src=\"/resources/icons/song.png\"/>\n" +
    "            <img alt=\"{{content.title}}\" class=\"md-avatar\" ng-if=\"content.type==='ALBUM'\"\n" +
    "                 src=\"/resources/icons/album.jpg\"/>\n" +
    "            <div class=\"md-list-item-text\" layout=\"column\">\n" +
    "                <h3>{{ content.title }}</h3>\n" +
    "                <h4 ng-bind-html=\"content.detail\"></h4>\n" +
    "                <p>{{ content.comment }}</p>\n" +
    "            </div>\n" +
    "            <md-divider ng-if=\"!$last\"></md-divider>\n" +
    "        </md-list-item>\n" +
    "    </md-list>\n" +
    "</div>"
  );


  $templateCache.put('/pages/chat/chat.html',
    "<div class=\"container\" flex layout=\"column\">\n" +
    "    <h3 ng-if=\"!ctrl.chat\">채팅이 없습니다.</h3>\n" +
    "    <md-tabs md-selected=\"root.user.chats.indexOf(ctrl.chat)\">\n" +
    "        <md-tab ng-click=\"ctrl.selectChat(c)\"\n" +
    "                ng-repeat=\"c in root.user.chats\">\n" +
    "            <md-tab-label>\n" +
    "                {{c.getName()}}\n" +
    "                <small>({{c.status}})</small>\n" +
    "                <md-icon class=\"chat-close\" ng-click=\"ctrl.closeChat(c, $event)\"><i>close</i></md-icon>\n" +
    "            </md-tab-label>\n" +
    "        </md-tab>\n" +
    "    </md-tabs>\n" +
    "    <div flex id=\"chat-list\" class=\"overlay\" scroll-glue ng-if=\"ctrl.chat\">\n" +
    "        <md-list flex>\n" +
    "            <md-list-item class=\"md-2-line\" ng-repeat=\"message in ctrl.chat.messages | orderBy:'createAt'\">\n" +
    "                <img ng-if=\"message.user.id!==root.user.id\" ng-src=\"{{message.user.photo}}\" class=\"md-avatar\"\n" +
    "                     alt=\"{{message.user.name}}\"/>\n" +
    "                <div class=\"md-list-item-text\" ng-class=\"{myword:message.user.id===root.user.id}\" layout=\"column\">\n" +
    "                    <p><span ng-if=\"message.user.id!==root.user.id\">{{message.user.name}}</span>\n" +
    "                        <small>{{message.createAt.toYMD()}}</small>\n" +
    "                    </p>\n" +
    "                    <h3>{{message.message}}</h3>\n" +
    "                </div>\n" +
    "                <md-divider class=\"dotted\" ng-if=\"!$last\"></md-divider>\n" +
    "            </md-list-item>\n" +
    "        </md-list>\n" +
    "    </div>\n" +
    "    <div layout=\"row\" style=\"min-height: 94px; margin-top:30px;\" ng-if=\"ctrl.chat\">\n" +
    "        <md-input-container flex ng-enter=\"ctrl.sendMessage(ctrl.chat, message)\">\n" +
    "            <label>내용</label>\n" +
    "            <input maxlength=\"200\" ng-model=\"ctrl.message\" type=\"text\">\n" +
    "        </md-input-container>\n" +
    "        <div>\n" +
    "            <md-button class=\"md-raised\" ng-click=\"ctrl.sendMessage(ctrl.chat)\">전송</md-button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/pages/collection/collection.html',
    "<div flex class=\"overlay\">\n" +
    "    <div class=\"container\">\n" +
    "        <md-input-container class=\"md-block movie-search\">\n" +
    "            <label>검색어</label>\n" +
    "            <md-icon><i>search</i></md-icon>\n" +
    "            <input ng-model=\"ctrl.keyword\">\n" +
    "        </md-input-container>\n" +
    "        <div angular-grid=\"ctrl.contents\" ag-grid-width=\"200\" ag-id=\"movies\" class=\"dynamic-grid\">\n" +
    "            <content collection=\"true\" content=\"content\"\n" +
    "                     ng-repeat=\"content in ctrl.contents | orderBy:'-updateAt'\"></content>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/pages/main/main.html',
    "<div flex class=\"overlay\">\n" +
    "    <div class=\"container\">\n" +
    "        <h1> 좋아하는 컨텐츠<small>를</small>\n" +
    "            수집<small>하는 서비스</small>\n" +
    "        </h1>\n" +
    "        <h1>\n" +
    "            <small>비슷한 취향의</small>\n" +
    "            이성<small>을</small>\n" +
    "            매칭<small>해주는 서비스</small>\n" +
    "        </h1>\n" +
    "        <h3> 1. 좋아하는 영화, 음악, 책을 수집하고 커맨트를 남깁니다. </h3>\n" +
    "        <h3> 2. 같은 작품을 좋아하는 이성이 매칭됩니다. </h3>\n" +
    "        <h3> 3. 매칭 후 대화 신청 / 수락을 하여 상대와 대화를 할 수 있습니다. </h3>\n" +
    "        <h3> 남자 50명 / 여자 50명이상 모이면 매칭하겠습니다. </h3>\n" +
    "        <h3> 현재 남자 {{ctrl.count.male}}명 / 여자 {{ctrl.count.female}}명이 모였습니다. </h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"container\" style=\"margin-top:100px\">\n" +
    "        <h5> 취직하게 되어서 그냥 접으려다가 그동안 만들었던거 아까워서 일단 공유해봅니다.<br> 쓰는 사람있으면 좋겠어요! 주말, 퇴근 후에 관리하도록 할게요. 대신\n" +
    "            무료입니다. </h5>\n" +
    "        <h5>\n" +
    "            <!-- 아무래도 아무 인증도 없으면 안될 것 같아서 휴대폰 번호 인증 정도만 해 둘게요. <br>-->\n" +
    "         서비스명 추천, 버그제보, 건의사항, 디자인 도움주실 분 이메일(<a href=\"mailto:parksungho86@gmail.com\">parksungho86@gmail.com</a>),\n" +
    "            카카오톡 아이디 zerohouse3으로 연락주세요. </h5>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"container\" style=\"margin-top:100px\">\n" +
    "        <h3> 의견 </h3>\n" +
    "        <div layout=\"row\">\n" +
    "            <md-input-container flex>\n" +
    "                <label>내용</label>\n" +
    "                <input ng-enter=\"ctrl.write()\" maxlength=\"200\" ng-model=\"ctrl.message\" type=\"text\">\n" +
    "            </md-input-container>\n" +
    "            <div>\n" +
    "                <md-button class=\"md-raised\" ng-click=\"ctrl.write()\">댓글달기</md-button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-repeat=\"reply in ctrl.replies | orderBy : '-id'\" class=\"margin-top-s\"> {{reply.message}}\n" +
    "            <small class=\"grey\"> - {{reply.user.name}} {{reply.createAt.toYMD()}} <span ng-if=\"root.user.id === reply.user.id\"\n" +
    "                                                                           ng-click=\"reply.delete()\">삭제</span></small>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/pages/match/match.html',
    "<div flex class=\"overlay\">\n" +
    "    <div class=\"container\" layout=\"column\">\n" +
    "        <h3 ng-if=\"!root.user.matchedUsers || root.user.matchedUsers.length === 0\">아직 매칭된 사용자가 없습니다.</h3>\n" +
    "        <user-card user=\"user\" ng-repeat=\"user in root.user.matchedUsers\"></user-card>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/pages/search/search.html',
    "<div flex layout=\"column\">\n" +
    "    <div flex layout=\"column\" class=\"wrapper\">\n" +
    "        <div class=\"container margin-top\" layout=\"row\" style=\"min-height: 70px\">\n" +
    "            <!--<md-input-container flex class=\"md-block movie-search\">-->\n" +
    "                <!--<label>검색어</label>-->\n" +
    "                <!--<md-icon><i>search</i></md-icon>-->\n" +
    "                <!--<input ng-model=\"ctrl.keyword\">-->\n" +
    "            <!--</md-input-container>-->\n" +
    "            <md-autocomplete flex class=\"margin-top-xs margin-left-s\"\n" +
    "                             ng-disabled=\"ctrl.isDisabled\"\n" +
    "                             md-no-cache=\"ctrl.noCache\"\n" +
    "                             md-selected-item=\"ctrl.selectedItem\"\n" +
    "                             md-search-text=\"ctrl.searchText\"\n" +
    "                             md-selected-item-change=\"ctrl.search(item.title)\"\n" +
    "                             md-items=\"item in ctrl.querySearch(ctrl.searchText)\"\n" +
    "                             md-item-text=\"item.title\"\n" +
    "                             md-min-length=\"0\"\n" +
    "                             placeholder=\"컨텐츠 검색\">\n" +
    "                <md-item-template>\n" +
    "                    <span md-highlight-text=\"ctrl.searchText\" md-highlight-flags=\"^i\">{{item.title}}</span>\n" +
    "                </md-item-template>\n" +
    "            </md-autocomplete>\n" +
    "            <div>\n" +
    "                <md-button class=\"md-raised\" ng-click=\"ctrl.search(item.searchText)\">검색</md-button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div flex class=\"overlay\">\n" +
    "            <div class=\"container\">\n" +
    "                <div angular-grid=\"ctrl.contents\" ag-grid-width=\"200\" class=\"dynamic-grid\">\n" +
    "                    <content content=\"content\" ng-repeat=\"content in ctrl.contents\"></content>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <collections ng-if=\"root.user.contents.length>0\" contents=\"root.user.contents\"></collections>\n" +
    "</div>"
  );


  $templateCache.put('/pages/user/user.html',
    "<div class=\"overlay\">\n" +
    "    <div class=\"container\">\n" +
    "        <md-button class=\"md-raised\" ng-click=\"showCard = !showCard\">카드 <span ng-show=\"!showCard\">보이기</span><span ng-show=\"showCard\">숨기기</span></md-button>\n" +
    "        <user-card ng-show=\"showCard\" user=\"root.user\" contents=\"root.user.contents\"></user-card>\n" +
    "        <div class=\"profile-header\" layout=\"row\" layout-align=\"center center\">\n" +
    "            <div class=\"profile\">\n" +
    "                <img ngf-drop=\"ctrl.uploadFile($file)\" ngf-select=\"ctrl.uploadFile($file)\"\n" +
    "                     ngf-drag-over-class=\"'dragover'\"\n" +
    "                     ngf-pattern=\"'image/*'\"\n" +
    "                     ng-src=\"{{root.user.photo||'/resources/icons/profile.png'}}\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div layout=\"column\">\n" +
    "            <md-input-container class=\"non-margin-bottom\" flex>\n" +
    "                <label>이름</label>\n" +
    "                <input ng-model=\"root.user.name\">\n" +
    "            </md-input-container>\n" +
    "            <md-input-container class=\"non-margin-bottom\" flex>\n" +
    "                <label>나이</label>\n" +
    "                <input number-only ng-model=\"root.user.age\">\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>성별</label>\n" +
    "                <md-select ng-model=\"root.user.gender\">\n" +
    "                    <md-option value=\"남\">\n" +
    "                        남\n" +
    "                    </md-option>\n" +
    "                    <md-option value=\"여\">\n" +
    "                        여\n" +
    "                    </md-option>\n" +
    "                </md-select>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>지역</label>\n" +
    "                <md-select ng-model=\"root.user.district\">\n" +
    "                    <md-option value=\"서울\">\n" +
    "                        서울\n" +
    "                    </md-option>\n" +
    "                    <md-option value=\"경기\">\n" +
    "                        경기\n" +
    "                    </md-option>\n" +
    "                    <md-option value=\"기타\">\n" +
    "                        기타\n" +
    "                    </md-option>\n" +
    "                </md-select>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container class=\"non-margin-bottom\" flex>\n" +
    "                <label>소개말</label>\n" +
    "                <input type=\"text\" ng-model=\"root.user.introduce\">\n" +
    "            </md-input-container>\n" +
    "            <md-button ng-click=\"ctrl.update(root.user)\" class=\"md-raised md-block\">\n" +
    "                저장하기\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/service/commentDialog/commnetDialog.html',
    "<md-dialog class=\"comment-dialog\">\n" +
    "    <md-toolbar>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h3>{{detail.title.removeTags() || '메모'}}\n" +
    "            </h3>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "                <md-icon><i>close</i></md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content style=\"padding-bottom:0\" class=\"md-dialog-content\">\n" +
    "        <div class=\"detail\">\n" +
    "            <div ng-bind-html=\"detail.description\"></div>\n" +
    "        </div>\n" +
    "        <md-input-container class=\"md-prompt-input-container non-margin-bottom\">\n" +
    "            <label>생각</label>\n" +
    "            <textarea ng-model=\"detail.comment\"></textarea>\n" +
    "        </md-input-container>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions>\n" +
    "        <span flex></span>\n" +
    "        <md-button ng-click=\"hide(detail.comment)\" style=\"margin-right:20px;\">\n" +
    "            저장하기\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>"
  );


  $templateCache.put('/service/loginDialog/loginDialog.html',
    "<md-dialog class=\"login-dialog\">\n" +
    "    <md-toolbar>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h3>로그인 </h3>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "                <md-icon><i>close</i></md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content class=\"md-dialog-content\" layout=\"column\">\n" +
    "        <md-input-container class=\"md-prompt-input-container\">\n" +
    "            <label>이메일</label>\n" +
    "            <input ng-model=\"user.email\"/>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-prompt-input-container\">\n" +
    "            <label>패스워드</label>\n" +
    "            <input ng-model=\"user.password\" type=\"password\"/>\n" +
    "        </md-input-container>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions>\n" +
    "        <div flex>\n" +
    "        </div>\n" +
    "        <md-button  ng-click=\"login(user)\">\n" +
    "            로그인\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>"
  );


  $templateCache.put('/service/registerDialog/registerDialog.html',
    "<md-dialog class=\"register-dialog\">\n" +
    "    <md-toolbar>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <h3>회원가입</h3>\n" +
    "            <span flex></span>\n" +
    "            <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "                <md-icon><i>close</i></md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content class=\"md-dialog-content\" layout=\"column\">\n" +
    "        <md-input-container class=\"md-prompt-input-container\">\n" +
    "            <label>이메일</label>\n" +
    "            <input ng-model=\"user.email\"/>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-prompt-input-container\">\n" +
    "            <label>패스워드</label>\n" +
    "            <input ng-model=\"user.password\" type=\"password\"/>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block movie-search\">\n" +
    "            <label>이름</label>\n" +
    "            <input ng-model=\"user.name\">\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block movie-search\">\n" +
    "            <label>나이</label>\n" +
    "            <input number-only ng-model=\"user.age\">\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"margin-bottom\">\n" +
    "            <label>성별</label>\n" +
    "            <md-select ng-model=\"user.gender\">\n" +
    "                <md-option value=\"남\">\n" +
    "                    남\n" +
    "                </md-option>\n" +
    "                <md-option value=\"여\">\n" +
    "                    여\n" +
    "                </md-option>\n" +
    "            </md-select>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container>\n" +
    "            <label>지역</label>\n" +
    "            <md-select ng-model=\"user.district\">\n" +
    "                <md-option value=\"서울\">\n" +
    "                    서울\n" +
    "                </md-option>\n" +
    "                <md-option value=\"경기\">\n" +
    "                    경기\n" +
    "                </md-option>\n" +
    "                <md-option value=\"기타\">\n" +
    "                    기타\n" +
    "                </md-option>\n" +
    "            </md-select>\n" +
    "        </md-input-container>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions>\n" +
    "        <div flex>\n" +
    "        </div>\n" +
    "        <md-button ng-click=\"register(user)\">\n" +
    "            회원가입\n" +
    "        </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "</md-dialog>"
  );

}]);
