from .extension import ma


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password')


class BlogSchema(ma.Schema):
    class Meta:
        fields = ('id', 'author_id', 'title', '', 'solution', 'reference')


class TagSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


class Tag_BlogSchema(ma.Schema):
    class Meta:
        fields = ('tag_id', 'blog_id')

